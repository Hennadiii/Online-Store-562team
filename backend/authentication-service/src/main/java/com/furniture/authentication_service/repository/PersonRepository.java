package com.furniture.authentication_service.repository;


import com.furniture.authentication_service.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, String> {

    Optional<Person> findByEmail(String email);
    boolean existsByEmail(String email);
}
