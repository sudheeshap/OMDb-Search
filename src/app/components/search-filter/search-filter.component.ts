import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { MovieService } from 'src/app/services/movie.service';
import { FilterService } from './../../services/filter.service';
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
  typeSubscription: Subscription;
  yearSubscription: Subscription;
  
  constructor(private filterService: FilterService, private movieService: MovieService) { }

  ngOnInit(): void {
    this.getTypes();
    this.getYears();
  }

  ngOnDestroy() {
    this.typeSubscription.unsubscribe();
    this.yearSubscription.unsubscribe();
  }

  getTypes(): void {
    this.typeSubscription = this.filterService.getTypes()
      .subscribe(types => this.types = types)
    ;
  }

  getYears(): void {
    this.yearSubscription = this.filterService.getYears()
      .subscribe(years => this.years = years)
    ;
  }

  search(): void {
    this.movieService.search(this.query);
  }

  onInput(): void {
    this.search();
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
