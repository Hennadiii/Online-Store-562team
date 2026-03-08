package com.furniture_store.shoppingcartservice.service.impl;

import com.furniture_store.shoppingcartservice.client.ProductCatalogClient;
import com.furniture_store.shoppingcartservice.client.dto.ProductCatalogResponse;
import com.furniture_store.shoppingcartservice.dto.CartItemDtoRequest;
import com.furniture_store.shoppingcartservice.entity.CartItem;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import com.furniture_store.shoppingcartservice.exception.CartNotFoundException;
import com.furniture_store.shoppingcartservice.repository.CartItemRepository;
import com.furniture_store.shoppingcartservice.repository.ShoppingCartRepository;
import com.furniture_store.shoppingcartservice.service.ShoppingCartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductCatalogClient productCatalogClient;

    @Override
    @Transactional
    public ShoppingCart createCart(Long userId) {
        ShoppingCart cart = new ShoppingCart();
        cart.setUserId(userId);
        cart.setCreatedDate(LocalDateTime.now());
        cart.setTotalPrice(0.0);
        return shoppingCartRepository.save(cart);
    }

    @Override
    @Transactional(readOnly = true)
    public ShoppingCart getCartById(Long cartId) {
        return shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found with id: " + cartId));
    }

    @Override
    @Transactional
    public ShoppingCart addItemToCart(Long cartId, CartItemDtoRequest request) {
        ShoppingCart cart = getCartById(cartId);

        // Получаем актуальные данные о товаре из product-catalog-service
        ProductCatalogResponse product = productCatalogClient.getProductById(request.getProductId());
        log.info("Fetched product from catalog: id={}, title={}, price={}",
                product.getId(), product.getTitle(), product.getPrice());

        // Цену берём из product-catalog (игнорируем цену из запроса)
        double actualPrice = product.getPrice();

        // Проверяем — может товар уже есть в корзине
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(request.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            // Просто увеличиваем количество
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + request.getQuantity());
            item.setPrice(actualPrice);
        } else {
            // Создаём новый элемент корзины
            CartItem newItem = new CartItem();
            newItem.setShoppingCart(cart);
            newItem.setProductId(request.getProductId());
            newItem.setQuantity(request.getQuantity());
            newItem.setPrice(actualPrice);
            cart.getItems().add(newItem);
        }

        recalculateTotalPrice(cart);
        return shoppingCartRepository.save(cart);
    }

    @Override
    @Transactional
    public ShoppingCart updateItemQuantity(Long cartId, Long productId, int quantity) {
        ShoppingCart cart = getCartById(cartId);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException(
                        "Product " + productId + " not found in cart " + cartId));

        if (quantity <= 0) {
            cart.getItems().remove(item);
        } else {
            item.setQuantity(quantity);
        }

        recalculateTotalPrice(cart);
        return shoppingCartRepository.save(cart);
    }

    @Override
    @Transactional
    public ShoppingCart removeItemFromCart(Long cartId, Long productId) {
        ShoppingCart cart = getCartById(cartId);

        cart.getItems().removeIf(item -> item.getProductId().equals(productId));

        recalculateTotalPrice(cart);
        return shoppingCartRepository.save(cart);
    }

    @Override
    @Transactional
    public void clearCart(Long cartId) {
        ShoppingCart cart = getCartById(cartId);
        cart.getItems().clear();
        cart.setTotalPrice(0.0);
        shoppingCartRepository.save(cart);
    }

    // ── helpers ──────────────────────────────────────────────────────────────

    private void recalculateTotalPrice(ShoppingCart cart) {
        double total = cart.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();
        cart.setTotalPrice(total);
    }
}