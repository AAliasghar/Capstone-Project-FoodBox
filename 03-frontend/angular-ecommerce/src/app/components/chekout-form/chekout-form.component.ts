import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
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
  
  countries: Country[]=[];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

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

    // populate countries

    this.foodBoxShopFormService.getCountries().subscribe(
      countriesData => {
        console.log("Retrieved countries: " + JSON.stringify(countriesData));
        this.countries = countriesData;
      }
    );

  }

  Submit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address : " + this.checkoutFormGroup.get('customer')!.value.email);
    console.log("The shipping address country : " + this.checkoutFormGroup.get('shippingAdress')!.value.country.name);
    console.log("The shipping address state : " + this.checkoutFormGroup.get('shippingAdress')!.value.state.name);
  }


  handleMonthsAndYears(){

    // getting credit card data
    const creditCardFromGroup = this.checkoutFormGroup.get('creditCard');

    // Current year
    const currentYear: number = new Date().getFullYear();
    // Read the selected year from the form input
    const selectedYear: number = Number( creditCardFromGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() +1;
      
    }
    else {
      startMonth = 1;
    }

    this.foodBoxShopFormService.getCreditCardMonths(startMonth).subscribe(
      months => {
        console.log(" Retrieved credit card months "+ JSON.stringify(months));
        this.creditCardMonths = months; 
      }
    )

  }


  getStates(formGroupName: string) {

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup!.value.country.code;
    const countryName = formGroup!.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.foodBoxShopFormService.getStates(countryCode).subscribe(
      data => {

        if (formGroupName === 'shippingAddress') {
          this.shippingAddressStates = data;
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup!.get('state')!.setValue(data[0]);
      }
    );
  }

}
