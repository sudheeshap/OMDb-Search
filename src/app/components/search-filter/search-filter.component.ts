import { FilterService } from './../../services/filter.service';
import { Component, OnInit } from '@angular/core';

import { Query } from './../../models/query.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  types: string[];
  years: string[];
  query: Query = new Query();
  
  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.getTypes();
    this.getYears();
  }

  getTypes(): void {
    this.filterService.getTypes()
      .subscribe(types => this.types = types)
    ;
  }

  getYears(): void {
    this.filterService.getYears()
      .subscribe(years => this.years = years)
    ;
  }

  search(): void {
    // this.movieService.search(this.query);
  }

  onSelectType(type: string) {
    this.query.type = type;
    this.search();
  }

  onSelectYear(year: string) {
    this.query.year = year;
    this.search();
  }
}
