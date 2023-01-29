import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodBoxValidators } from 'src/app/validators/food-box-validators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {


  ngOnInit(): void {
     throw new Error('Method not implemented.');
  }

  success(){
     alert("Success!");
  }
  
  
}
