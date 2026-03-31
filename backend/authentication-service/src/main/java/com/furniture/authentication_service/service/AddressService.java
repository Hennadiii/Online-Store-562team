package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.AddressRequest;
import com.furniture.authentication_service.dto.AddressResponse;
import com.furniture.authentication_service.exception.CustomException;
import com.furniture.authentication_service.model.Address;
import com.furniture.authentication_service.model.Person;
import com.furniture.authentication_service.repository.AddressRepository;
import com.furniture.authentication_service.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;
    private final PersonRepository personRepository;

    // ── helpers ───────────────────────────────────────────────────────────────

    private UUID currentUserId() {
        String userId = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName(); // subject з токена = person.getId().toString()
        try {
            return UUID.fromString(userId);
        } catch (IllegalArgumentException e) {
            throw new CustomException("Invalid authentication token", HttpStatus.UNAUTHORIZED);
        }
    }

    private Person getPerson(UUID id) {
        return personRepository.findById(id)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
    }

    private Address getAddressOwned(UUID addressId, UUID personId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new CustomException("Address not found", HttpStatus.NOT_FOUND));
        if (!address.getPerson().getId().equals(personId))
            throw new CustomException("Access denied", HttpStatus.FORBIDDEN);
        return address;
    }

    private AddressResponse toResponse(Address a) {
        return AddressResponse.builder()
                .id(a.getId())
                .firstName(a.getFirstName())
                .lastName(a.getLastName())
                .phone(a.getPhone())
                .city(a.getCity())
                .region(a.getRegion())
                .street(a.getStreet())
                .house(a.getHouse())
                .apartment(a.getApartment())
                .floor(a.getFloor())
                .hasElevator(a.isHasElevator())
                .isDefault(a.isDefault())
                .createdAt(a.getCreatedAt())
                .build();
    }

    private Address buildAddress(AddressRequest req, Person person, boolean isDefault) {
        return Address.builder()
                .person(person)
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .phone(req.getPhone())
                .city(req.getCity())
                .region(req.getRegion())
                .street(req.getStreet())
                .house(req.getHouse())
                .apartment(req.getApartment())
                .floor(req.getFloor())
                .hasElevator(req.isHasElevator())
                .isDefault(isDefault)
                .build();
    }

    // ── public API ────────────────────────────────────────────────────────────

    public List<AddressResponse> getAll() {
        UUID userId = currentUserId();
        return addressRepository
                .findByPersonIdOrderByIsDefaultDescCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public AddressResponse create(AddressRequest req) {
        UUID userId = currentUserId();
        Person person = getPerson(userId);
        // Перший адрес автоматично стає default
        boolean isFirst = !addressRepository.existsByPersonId(userId);
        return toResponse(addressRepository.save(buildAddress(req, person, isFirst)));
    }

    @Transactional
    public AddressResponse update(UUID addressId, AddressRequest req) {
        UUID userId = currentUserId();
        Address address = getAddressOwned(addressId, userId);

        address.setFirstName(req.getFirstName());
        address.setLastName(req.getLastName());
        address.setPhone(req.getPhone());
        address.setCity(req.getCity());
        address.setRegion(req.getRegion());
        address.setStreet(req.getStreet());
        address.setHouse(req.getHouse());
        address.setApartment(req.getApartment());
        address.setFloor(req.getFloor());
        address.setHasElevator(req.isHasElevator());
        // isDefault і createdAt не чіпаємо

        return toResponse(addressRepository.save(address));
    }

    @Transactional
    public void delete(UUID addressId) {
        UUID userId = currentUserId();
        Address address = getAddressOwned(addressId, userId);
        boolean wasDefault = address.isDefault();

        addressRepository.delete(address);
        // Hibernate синхронізує в межах @Transactional — flush не потрібен

        if (wasDefault) {
            addressRepository
                    .findByPersonIdOrderByIsDefaultDescCreatedAtDesc(userId)
                    .stream()
                    .findFirst()
                    .ifPresent(next -> {
                        next.setDefault(true);
                        addressRepository.save(next);
                    });
        }
    }

    @Transactional
    public AddressResponse setDefault(UUID addressId) {
        UUID userId = currentUserId();
        Address address = getAddressOwned(addressId, userId);
        // clearDefault + setDefault в одній транзакції
        // унікальний індекс на БД захищає від race condition
        addressRepository.clearDefaultForPerson(userId);
        address.setDefault(true);
        return toResponse(addressRepository.save(address));
    }
}