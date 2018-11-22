import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) {}

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.movies$ = this.movieService.getWatchList();
  }

  /**
   * @inheritdoc
   */
  ngOnDestroy() {
    this.movieService.watchListSubscription.unsubscribe();
  }
}
