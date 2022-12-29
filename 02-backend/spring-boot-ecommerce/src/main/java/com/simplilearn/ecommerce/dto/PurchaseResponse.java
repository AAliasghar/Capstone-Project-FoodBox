package com.simplilearn.ecommerce.dto;

import lombok.Data;

// Use this class to send java back a Java object as JSON
@Data
public class PurchaseResponse {
    private final String orderTrackingNumber;
    // adding final as Lombok @Data will generate constructor for final fields
    // Or instead final, @NotNull can be used
}
