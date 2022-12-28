import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FoodBoxShopFormService } from 'src/app/services/food-box-shop-form.service';

@Component({
  selector: 'app-chekout-form',
  templateUrl: './chekout-form.component.html',
  styleUrls: ['./chekout-form.component.css']
})


export class ChekoutFormComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardMonths: number[] = [];
  creditCardYears: number[] = [];

  // Injecting FoodBoxShopFormService
  constructor(private formBuilder: FormBuilder, private foodBoxShopFormService: FoodBoxShopFormService) { }


  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    // populate credit card yeards
    this.foodBoxShopFormService.getCreditCardYears().subscribe(
      years => {
        console.log("Retrieved credit card years: " + JSON.stringify(years));
        this.creditCardYears = years;
      }
    )

    // populate credit card months
    const startingMonth: number = new Date().getMonth() + 1; // Adding +1 as we get current month received as 0-based
    console.log("startingMonth: " + startingMonth);

    this.foodBoxShopFormService.getCreditCardMonths(startingMonth).subscribe(
      months => {

        console.log(" Received credit card months: " + JSON.stringify(months));
        this.creditCardMonths = months;
      }
    )
  }

  Submit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address : " + this.checkoutFormGroup.get('customer')!.value.email);
  }




}
