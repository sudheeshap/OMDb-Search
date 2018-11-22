import { Component, OnInit, Input } from '@angular/core';

import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;

  constructor(private movieService: MovieService) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
  }

  /**
   * Returns the movie poster link
   * @returns {string}
   */
  get thumbImageLink(): string {
    return this.movie.Poster === 'N/A' ? '' : this.movie.Poster;
  }

  /**
   * Clicked on add button
   * @param movie
   * @returns {void}
   */
  onClickAdd(movie: Movie): void {
    movie.isListed = true;
    this.movieService.addMovie(movie);
  }

  /**
   * Clicked on remove button
   * @param movie
   * @returns {void}
   */
  onClickRemove(movie: Movie): void {
    movie.isListed = false;
    this.movieService.removeMovie(movie);
  }
}
