import { LocalStorageService } from './../../services/local-storage.service';
import { Query } from './../../models/query.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  movies$: Observable<Movie[]>;
  hasSearch: boolean;

  constructor(
    private movieService: MovieService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.movies$ = this.movieService.getSearchList();
    this.hasSearch = !!this.localStorageService.getItem('has-search');
  }

  ngOnDestroy() {
    this.movieService.searchListSubscription.unsubscribe();
  }
}
