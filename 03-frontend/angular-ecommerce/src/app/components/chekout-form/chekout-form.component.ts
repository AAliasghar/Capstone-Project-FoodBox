import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { FoodBoxShopFormService } from 'src/app/services/food-box-shop-form.service';
import { FoodBoxValidators } from 'src/app/validators/food-box-validators';

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

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  // Injecting FoodBoxShopFormService
  constructor(private formBuilder: FormBuilder,
              private foodBoxShopFormService: FoodBoxShopFormService,
              private cartService: CartService) { }


  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FoodBoxValidators.notOnlyWhitespace]),

        lastName: new FormControl('',
          [Validators.required,
          Validators.minLength(2),
          FoodBoxValidators.notOnlyWhitespace]),

        email: new FormControl('',
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),

      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
        FoodBoxValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
        FoodBoxValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
        FoodBoxValidators.notOnlyWhitespace])
      }),

      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),
        FoodBoxValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),
        FoodBoxValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),
        FoodBoxValidators.notOnlyWhitespace])
      }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2),
        FoodBoxValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
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

    // Calling reviewCartDetails(); method 
    this.reviewCartDetails();



  }


  reviewCartDetails() {
    
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  // Used by HTML template to get access to the form control and check status of form control, validation
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }

  // ShippingAddress -> Define Getter methods to access from controls
  get shippingAddressStreet() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get shippingAddressCity() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get('shippingAddress.country'); }

  // BillingAddress -> Define Getter methods to access from controls
  get billingAddressStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get billingAddressCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get billingAddressState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }
  get billingAddressCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }

  // Creditcards -> Define Getter methods to access from controls
  get creditCardType() { return this.checkoutFormGroup.get('creditCard.cardType'); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get('creditCard.nameOnCard'); }
  get creditCardNumber() { return this.checkoutFormGroup.get('creditCard.cardNumber'); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get('creditCard.securityCode'); }

  Submit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('customer')!.value);
    console.log("The email address : " + this.checkoutFormGroup.get('customer')!.value.email);
    console.log("The shipping address country : " + this.checkoutFormGroup.get('shippingAdress')!.value.country.name);
    console.log("The shipping address state : " + this.checkoutFormGroup.get('shippingAdress')!.value.state.name);
  }


  handleMonthsAndYears() {

    // getting credit card data
    const creditCardFromGroup = this.checkoutFormGroup.get('creditCard');

    // Current year
    const currentYear: number = new Date().getFullYear();
    // Read the selected year from the form input
    const selectedYear: number = Number(creditCardFromGroup?.value.expirationYear);

    // if the current year equals the selected year, then start with current month

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;

    }
    else {
      startMonth = 1;
    }

    this.foodBoxShopFormService.getCreditCardMonths(startMonth).subscribe(
      months => {
        console.log(" Retrieved credit card months " + JSON.stringify(months));
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
