import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


import { Movie } from './../../models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  // movies$: Observable<Movie[]>;
  movies$: Observable<{}[]>;

  constructor(
    private movieService: MovieService, private db: AngularFireDatabase) {
    }

  ngOnInit() {
    // this.movies$ = this.movieService.getWatchList();
    // this.movies$ = this.db.list('items').valueChanges()
    // this.movies$ = this.db.collection('items').valueChanges();
    this.movies$ = this.movieService.getWatchList();
  }
}
