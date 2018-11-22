import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, debounceTime, switchMap } from 'rxjs/operators';
import { Observable, Subject, of, Subscription, BehaviorSubject } from 'rxjs';

import { Query } from './../models/query.model';
import { Movie } from 'src/app/models/movie.model';
import { UserService } from './user.service';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  searchListSubscription: Subscription;
  watchListSubscription: Subscription;

  private isLoadMoreActive: boolean;
  private watchList: Movie[] = [];
  private movies: Movie[];
  private omdbApiUrl: string = 'https://www.omdbapi.com/?i=tt3896198&apikey=3cc051ad';  // OMDb api URL
  private searchTerms: BehaviorSubject<Query> = new BehaviorSubject(<Query>{ type: 'initial' });
  private watchListSubject: Subject<Movie[]> = new Subject<Movie[]>();
  private watchList$: Observable<Movie[]> = this.watchListSubject.asObservable();
  private moviesSubject: Subject<Movie[]> = new Subject<Movie[]>();
  private movies$: Observable<Movie[]> = this.moviesSubject.asObservable();
  private totalResultSubject: Subject<number> = new Subject<number>();

  totalResults$ = this.totalResultSubject.asObservable();
    
  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {}

  /**
   * Search for the query
   * @param {Query} query
   * @returns {void}
   */
  search(query: Query): void {
    // Always search first page initially
    query.page = 1;
    this.isLoadMoreActive = false;
    this.searchTerms.next(query);
  }

  /**
   * Load the next page
   * @returns {void}
   */
  loadNextPage(): void {
    const query: Query = this.searchTerms.getValue();

    query.page += 1;
    this.isLoadMoreActive = true;
    this.searchTerms.next(query);
  }

  /**
   * Returns the search result movies synced with watchlist
   * @param {Movie[]} movies
   * @returns {Movie[]}
   */
  getSyncedSearchList(movies: Movie[]): Movie[] {
    this.watchList.forEach((movie: Movie) => {
      let index: number = movies.findIndex(m => m.imdbID === movie.imdbID);
      
      if (index > -1) {
        // Set as already listed
        movies[index].isListed = true;
      }
    });

    return movies;
  }

  /**
   * Returns the observable of search results
   * @returns {Observable<Movie[]>}
   */
  getSearchList(): Observable<Movie[]> {

    this.searchListSubscription = this.searchTerms.pipe(
      // Wait 400ms after each keystroke before considering the term
      debounceTime(400),

      // Switch to new search observable each time the term changes
      switchMap((query: Query) => this.searchMovies(query)),
    ).subscribe((movies: Movie[] = []) => {
      let allMovies: Movie[];

      if (this.isLoadMoreActive) {
        allMovies = [...(this.movies || []), ...movies];
      } else {
        allMovies = movies;
      }
      
      this.movies = this.getSyncedSearchList(allMovies);
      this.moviesSubject.next(this.movies);
      return this.movies;
    });

    return this.movies$;
  }

  /**
   * Returns the observable of watchlist
   * @returns {Observable<Movie[]>}
   */
  getWatchList(): Observable<Movie[]> {
    this.watchListSubscription = this.firebaseService.getDatabase()
      .list<Movie>(`${this.userService.getFirebaseUserKey()}/watchlist`).valueChanges()
      .subscribe((movies: Movie[] = []) => {
        this.watchList = movies;
        this.watchListSubject.next(this.watchList);
        return this.watchList;
      })
    ;

    return this.watchList$;
  }

  /**
   * Returns the observable of movies from the OMDb API response
   * @param {Query} query
   * @returns {Observable<Movie[]>}
   */
  searchMovies(query: Query): Observable<Movie[]> {
    let url: string;

    // Initial search on page load
    if (query.type === 'initial') {
      query.type = '';
      return of();
    }

    // Search term not enough
    if (!query.title || (query.title && query.title.length < 3)) {

      this.totalResultSubject.next(0);

      return of([]);
    } else {
      url = this.omdbApiUrl + `&s=${query.title}`;
    }

    if (query.type) {
      url = url + `&type=${query.type}`;
    }

    if (query.year) {
      url = url + `&y=${query.year}`;
    }

    query.page = query.page || 1;
    
    url = url + `&page=${query.page}`;

    return this.http.get<Movie[]>(url)
      .pipe(
        tap(_ => console.log(`found movies matching "${query.title}"`)),
        map(res => {
          // Total result count of current search
          this.totalResultSubject.next(parseInt(res['totalResults']));
          return res['Search'];
        })
    );
  }

  /**
   * Save the watchlist to the user firebase path
   * @returns {void}
   */
  saveWatchList(): void {
    this.firebaseService.setValue(this.userService.getFirebaseUserKey(), 'watchlist', this.watchList);
  }

  /**
   * Add movie to the watchlist
   * @param {Movie} movie
   * @returns {void}
   */
  addMovie(movie: Movie): void {
    this.watchList.push(movie);
    this.saveWatchList();
  }

  /**
   * Remove movie from the watchlist
   * @param {Movie} movie
   * @returns {void}
   */
  removeMovie(movie: Movie): void {
    this.watchList = this.watchList.filter((m: Movie) => m.imdbID !== movie.imdbID);

    if (!!this.movies) {
      let index: number = this.movies.findIndex(m => m.imdbID === movie.imdbID);

      if (index > -1) {
        // Set search list movie as already listed
        this.movies[index].isListed = false;
      }

      this.moviesSubject.next(this.movies);
    }
    
    this.saveWatchList();
  }
}
