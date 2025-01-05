package com.furniture_store.order_management_service.web;

import com.furniture_store.order_management_service.dto.*;
import com.furniture_store.order_management_service.exception.WebClientException;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class NovaPoshtaWebClient {

    private static final String API_KEY = "71aaa34fde31761583e163cb0cbf864e";
    private static final String API_URL = "https://api.novaposhta.ua/v2.0/json/";
    private final RestTemplateBuilder restTemplateBuilder;

    public NovaPoshtaWebClient(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplateBuilder = restTemplateBuilder;
    }

    public List<WarehouseDto> getWarehouses(String city, int pageSize, int page) {
        RestTemplate client = restTemplateBuilder.rootUri(API_URL).build();
        ApiRequestBody requestBody = new ApiRequestBody();
        requestBody.setApiKey(API_KEY);
        requestBody.setModelName("AddressGeneral");
        requestBody.setCalledMethod("getWarehouses");
        ApiRequestBody.GetWarehousesMethodProperties methodProperties = requestBody.new GetWarehousesMethodProperties();
        methodProperties.setCityName(city);
        methodProperties.setPage(page);
        methodProperties.setLimit(pageSize);

        requestBody.setMethodProperties(methodProperties);

        WarehousesResponse response = client.postForObject("/", requestBody, WarehousesResponse.class);
        if(response==null || !response.isSuccess()){
            throw new WebClientException();
        }
        return response.getData();
    }

    public List<StreetDto> getStreets(String keyword, int pageSize, int page) {
        RestTemplate client = restTemplateBuilder.rootUri(API_URL).build();
        ApiRequestBody requestBody = new ApiRequestBody();
        requestBody.setApiKey(API_KEY);
        requestBody.setModelName("AddressGeneral");
        requestBody.setCalledMethod("getStreet");
        ApiRequestBody.GetStreetMethodProperties methodProperties = requestBody.new GetStreetMethodProperties();
        methodProperties.setFindByString(keyword);
        methodProperties.setPage(page);
        methodProperties.setLimit(pageSize);

        requestBody.setMethodProperties(methodProperties);

        StreetsResponse response = client.postForObject("/", requestBody, StreetsResponse.class);
        if (response == null || !response.isSuccess()) {
            throw new WebClientException();
        }
        return response.getData();
    }

}
