import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
constructor(private router: Router){}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // Method called in html page
  doSearch(value: string) {
    // Just for debugging 
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

}
