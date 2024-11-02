package com.example.productcatalogservice.dto.mapper;

import org.springframework.stereotype.Component;

@Component
public interface ObjectMapper<ENTITY, REQ, RESP> {
    ENTITY toEntity(REQ req);
    RESP toResp(ENTITY entity);
}
