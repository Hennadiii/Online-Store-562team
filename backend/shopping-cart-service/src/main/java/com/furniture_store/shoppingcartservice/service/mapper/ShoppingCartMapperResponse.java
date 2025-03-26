package com.furniture_store.shoppingcartservice.service.mapper;

import com.furniture_store.shoppingcartservice.dto.ShoppingCartDtoResponse;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import org.mapstruct.Mapper;

@Mapper(config = MapperConfig.class)
public interface ShoppingCartMapperResponse extends Mappable<ShoppingCart, ShoppingCartDtoResponse> {

}
