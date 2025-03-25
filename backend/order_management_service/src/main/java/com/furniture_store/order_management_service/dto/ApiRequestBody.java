package com.furniture_store.order_management_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiRequestBody {

    private String apiKey;
    private String modelName;
    private String calledMethod;
    private MethodProperties methodProperties;

    @Data
    @JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
    @JsonSubTypes({
            @JsonSubTypes.Type(value = GetStreetMethodProperties.class, name = "getStreets"),
            @JsonSubTypes.Type(value = GetWarehousesMethodProperties.class, name = "getWarehouses")
    })
    public abstract class MethodProperties {
        @JsonProperty("Page")
        protected int page;
        @JsonProperty("Limit")
        protected int limit;
    }

    @Data
    public class GetWarehousesMethodProperties extends MethodProperties {
        @JsonProperty("CityName")
        private String cityName;
    }

    @Data
    public class GetStreetMethodProperties extends MethodProperties {
        @JsonProperty("FindByString")
        private String findByString;
    }
}