package com.furniture_store.shoppingcartservice.repository;

import com.furniture_store.shoppingcartservice.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByShoppingCart_Id(Long shoppingCartId);

    void deleteByShoppingCart_Id(Long shoppingCartId);

    Optional<CartItem> findByShoppingCart_IdAndProductId(Long shoppingCartId, Long productId);
}
