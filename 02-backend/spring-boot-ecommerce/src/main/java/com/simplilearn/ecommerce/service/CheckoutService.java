package com.simplilearn.ecommerce.service;

import com.simplilearn.ecommerce.dto.Purchase;
import com.simplilearn.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
