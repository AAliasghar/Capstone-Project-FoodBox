import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodBoxShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let months: number[] = [];

    // creating an array for "Month"
    // Month start at current month and loop unitl 12

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      months.push(theMonth);
    }

    return of(months);  // 'of' operator will wrap an object as an Observable
  }

  getCreditCardYears(): Observable<number[]> {

    let years: number[] = [];

    // creating an array for "Years"
    // Month start at current month and loop unitl 5 (Years)

    // Getting current year
    const startingYear: number = new Date().getFullYear();
    const endingYear: Number = startingYear + 5 ;

    for (let theYear = startingYear; theYear <= endingYear; theYear++) {
     
      years.push(theYear);
    }

    return of(years);
  }

}
