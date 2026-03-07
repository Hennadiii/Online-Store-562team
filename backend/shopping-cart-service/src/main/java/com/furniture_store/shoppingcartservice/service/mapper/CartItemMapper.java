package com.furniture_store.shoppingcartservice.service.mapper;

import com.furniture_store.shoppingcartservice.dto.CartItemDtoRequest;
import com.furniture_store.shoppingcartservice.entity.CartItem;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface CartItemMapper extends Mappable<CartItem, CartItemDtoRequest> {

}
