import { LocalStorageService } from './../../services/local-storage.service';
import { Query } from './../../models/query.model';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  movies$: Observable<Movie[]>;
  totalResults$: Observable<number>;
  totalResultsSubscription: Subscription;

  totalCount: number;
  hasSearch: boolean;

  constructor(
    private movieService: MovieService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.movies$ = this.movieService.getSearchList();
    this.totalResults$ = this.movieService.totalResults$;

    this.totalResultsSubscription = this.totalResults$.subscribe((count: number) => {
      this.totalCount = count;
    console.log(this.totalCount);
      return count;
    });
    
    this.hasSearch = !!this.localStorageService.getItem('has-search');
  }

  ngOnDestroy() {
    this.totalResultsSubscription.unsubscribe();
    this.movieService.searchListSubscription.unsubscribe();
  }

  onClickLoadMore() {
    this.movieService.loadNextPage();
  }
}
