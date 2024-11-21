package com.furniture_store.shoppingcartservice.service.mapper;

import com.furniture_store.shoppingcartservice.dto.ShoppingCartDtoRequest;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ShoppingCartMapperRequest extends Mappable<ShoppingCart, ShoppingCartDtoRequest>{
    @Override
    ShoppingCart toEntity(ShoppingCartDtoRequest dto);

    @Override
    ShoppingCartDtoRequest toDto(ShoppingCart entity);

    @Override
    List<ShoppingCartDtoRequest> toDto(List<ShoppingCart> entity);

}
