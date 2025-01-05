package com.furniture_store.order_management_service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {

    private boolean success;
    private List<T> data;
    private List<String> errors;
    private List<String> warnings;
//    private List<String> messageCodes;
//    private List<String> errorCodes;
//    private List<String> warningCodes;
//    private List<String> infoCodes;

}
