import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { MovieService } from 'src/app/services/movie.service';
import { FilterService } from './../../services/filter.service';
import { Query } from './../../models/query.model';
import { LocalStorageService } from './../../services/local-storage.service';

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
  
  constructor(
    private filterService: FilterService,
    private movieService: MovieService,
    private localStorageService: LocalStorageService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.getTypes();
    this.getYears();
  }

  /**
   * @inheritdoc
   */
  ngOnDestroy() {
    this.typeSubscription.unsubscribe();
    this.yearSubscription.unsubscribe();
  }

  /**
   * Collect types by a subscription
   * @returns {void}
   */
  getTypes(): void {
    this.typeSubscription = this.filterService.getTypes()
      .subscribe(types => this.types = types)
    ;
  }

  /**
   * Collect years by a subscription
   * @returns {void}
   */
  getYears(): void {
    this.yearSubscription = this.filterService.getYears()
      .subscribe(years => this.years = years)
    ;
  }

  /**
   * Search for the query
   * @returns {void}
   */
  search(): void {
    this.movieService.search(this.query);
  }

  /**
   * Set the searched state in local storage
   * @returns {void}
   */
  setSearched(): void {
    if (!this.localStorageService.getItem('has-search')) {
      this.localStorageService.setItem('has-search', 'true');
    }
  }

  /**
   * Text entered in textbox
   * @returns {void}
   */
  onInput(): void {
    this.search();
    this.setSearched();
  }

  /**
   * Type selected
   * @param {string} type
   * @returns {void} 
   */
  onSelectType(type: string): void {
    this.query.type = type;
    this.search();
  }

  /**
   * Year selected
   * @param {string} year
   * @returns {void}
   */
  onSelectYear(year: string): void {
    this.query.year = year;
    this.search();
  }
}
