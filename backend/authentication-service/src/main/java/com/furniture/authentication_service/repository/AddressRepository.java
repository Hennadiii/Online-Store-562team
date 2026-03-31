package com.furniture.authentication_service.repository;

import com.furniture.authentication_service.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {

    List<Address> findByPersonIdOrderByIsDefaultDescCreatedAtDesc(UUID personId);

    boolean existsByPersonId(UUID personId);

    @Modifying
    @Query("UPDATE Address a SET a.isDefault = false WHERE a.person.id = :personId")
    void clearDefaultForPerson(@Param("personId") UUID personId);
}