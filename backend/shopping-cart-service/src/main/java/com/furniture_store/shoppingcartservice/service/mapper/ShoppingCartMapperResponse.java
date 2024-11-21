package com.furniture_store.shoppingcartservice.service.mapper;

import com.furniture_store.shoppingcartservice.dto.ShoppingCartDtoResponse;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShoppingCartMapperResponse extends Mappable<ShoppingCart, ShoppingCartDtoResponse> {
    @Override
    ShoppingCart toEntity(ShoppingCartDtoResponse dto);

    @Override
    ShoppingCartDtoResponse toDto(ShoppingCart entity);

    @Override
    List<ShoppingCartDtoResponse> toDto(List<ShoppingCart> entity);
}
