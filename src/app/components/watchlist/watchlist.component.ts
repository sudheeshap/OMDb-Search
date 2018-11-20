import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Movie } from './../../models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  movies$: Observable<Movie[]>;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.movies$ = this.movieService.getWatchList();
  }
}
