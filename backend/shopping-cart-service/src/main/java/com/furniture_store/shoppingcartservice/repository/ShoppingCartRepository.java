package com.furniture_store.shoppingcartservice.repository;

import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {

    Optional<ShoppingCart> findShoppingCartByUserId(Long userId);
    boolean existsByUserId(Long userId);
    void deleteByUserId(Long userId);

}
