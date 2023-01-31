import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class FoodBoxShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) { }


  getCountries(): Observable<Country[]> {

    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {

    // search url
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }


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
    const endingYear: Number = startingYear + 5;

    for (let theYear = startingYear; theYear <= endingYear; theYear++) {

      years.push(theYear);
    }

    return of(years);
  }


}

// Unwrap JSON Data
interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
