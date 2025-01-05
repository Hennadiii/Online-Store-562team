package com.furniture_store.order_management_service.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class WarehouseDto {

    @JsonProperty("SiteKey")
    private String siteKey;

    @JsonProperty("Description")
    private String description;

    @JsonProperty("ShortAddress")
    private String shortAddress;

    @JsonProperty("SettlementDescription")
    private String settlementDescription;

    @JsonProperty("SettlementAreaDescription")
    private String settlementAreaDescription;

    @JsonProperty("SettlementRegionsDescription")
    private String settlementRegionsDescription;

    @JsonProperty("CategoryOfWarehouse")
    private String categoryOfWarehouse;

    @JsonProperty("PostalCodeUA")
    private String postalCodeUA;

}
