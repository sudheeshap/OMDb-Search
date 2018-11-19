import { FilterService } from './../../services/filter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent implements OnInit {
  
  types: string[];
  years: string[];
  
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

}
