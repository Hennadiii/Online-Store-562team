package com.furniture_store.shoppingcartservice.service.mapper;

import com.furniture_store.shoppingcartservice.dto.ShoppingCartDtoResponse;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(config = MapperConfig.class)
public interface ShoppingCartMapperResponse extends Mappable<ShoppingCart, ShoppingCartDtoResponse> {

    @Override
    @Mapping(source = "id", target = "cartId")
    ShoppingCartDtoResponse toDto(ShoppingCart entity);
}