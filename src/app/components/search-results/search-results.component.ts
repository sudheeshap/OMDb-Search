import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { LocalStorageService } from './../../services/local-storage.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  totalCount: number;
  hasSearch: boolean;
  movies$: Observable<Movie[]>;

  private totalResultsSubscription: Subscription;

  constructor(
    private movieService: MovieService,
    private localStorageService: LocalStorageService
  ) { }

  
  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.movies$ = this.movieService.getSearchList();
    this.hasSearch = !!this.localStorageService.getItem('has-search');

    // Subscribe to the result count
    this.totalResultsSubscription = this.movieService.totalResults$
      .subscribe((count: number) => {
        this.totalCount = count;
        return count;
      })
    ;
  }

  /**
   * @inheritdoc
   */
  ngOnDestroy() {
    this.totalResultsSubscription.unsubscribe();
    this.movieService.searchListSubscription.unsubscribe();
  }

  /**
   * Clicked on the load more button
   * @returns {void}
   */
  onClickLoadMore(): void {
    this.movieService.loadNextPage();
  }
}
