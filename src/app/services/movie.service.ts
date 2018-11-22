import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, Subject, of, Subscriber, Subscription } from 'rxjs';

import { Query } from './../models/query.model';
import { Movie } from 'src/app/models/movie.model';
import { UserService } from './user.service';
import { AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  watchList: Movie[] = [];
  private omdbApiUrl:string = 'https://www.omdbapi.com/?i=tt3896198&apikey=3cc051ad';  // OMDb api URL
  private searchTerms: Subject<Query> = new Subject<Query>();
  private watchListSubject: Subject<Movie[]> = new Subject<Movie[]>();
  watchList$: Observable<Movie[]> = this.watchListSubject.asObservable();

  // private moviesSubject: Subject<Movie[]> = new Subject<Movie[]>();
  private moviesSubject: Subject<Movie[]> = new Subject<Movie[]>();
  movies$: Observable<Movie[]> = this.moviesSubject.asObservable();
  movies: Movie[];
  searchListSubscription: Subscription;
  watchListSubscription: Subscription;
    
  constructor(
    private http: HttpClient,
    private firebaseService: FirebaseService,
    private userService: UserService) {

    }

  search(query: Query) {
    console.log(query);
    this.searchTerms.next(query);
  }

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

  getSearchList(): Observable<Movie[]> {

    this.searchListSubscription = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      // distinctUntilChanged((a: Query, b: Query) => {console.log(a, b); return a.title !== b.title}),

      // switch to new search observable each time the term changes
      switchMap((query: Query) => this.searchMovies(query)),
    ).subscribe((movies: Movie[] = []) => {
      console.log(movies);
      
      this.movies = this.getSyncedSearchList(movies);
      this.moviesSubject.next(this.movies);
      return this.movies;
    });

    // return this.movies$.pipe(map(movies => {console.log(movies);return movies}));
    return this.movies$;
  }

  // getWatchList() {
  //   const _watchList: AngularFireList<Movie> = this.firebaseService.getDatabase()
  //     .list<Movie>(`${this.userService.getFirebaseUserKey()}/watchlist`)
  //   ;
    
  //   _watchList.valueChanges().subscribe((movies) => this.watchList = movies);

  //   return _watchList.valueChanges();
  // }

  getWatchList() {
    // console.log(this.firebaseService.getDatabase().list<Movie>(`${this.userService.getFirebaseUserKey()}/watchlist`));
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

  searchMovies(query: Query): Observable<Movie[]> {
    console.log(query);
    let url: string;

    if (!query.title || (query.title && query.title.length < 3)) {
      // if not search term, return empty movie array.
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

    // return this.http.get<Movie[]>(`${this.omdbApiUrl}/?s=${query.title}`).pipe(
      return this.http.get<Movie[]>(url)
        .pipe(
          tap(_ => console.log(`found movies matching "${query.title}"`)),
          map(res => res['Search'])
          // catchError(this.handleError<Movie[]>('searchHeroes', []))
      );
  }

  saveWatchList() {
    this.firebaseService.setValue(this.userService.getFirebaseUserKey(), 'watchlist', this.watchList);
  }

  addMovie(movie) {
    this.watchList.push(movie);
    // this.watchListSubject.next(this.watchList);
    this.saveWatchList();

    // const itemsRef = db.list('items');
    // // to get a key, check the Example app below
    // itemsRef.set('key-of-some-data', { size: newSize });

    // // this.firebaseService.getDatabase()
    // //     .list(`/users/${this.sessionUser.id}`).valueChanges()
    // //     .subscribe((res => {
    // //       console.log(res);
    // //       return res;
    // //     }))
    // //   ;
  }

  removeMovie(movie: Movie) {
    this.watchList = this.watchList.filter((m: Movie) => m.imdbID !== movie.imdbID);

    if (!!this.movies) {
      let index: number = this.movies.findIndex(m => m.imdbID === movie.imdbID);

      if (index > -1) {
        // Set as already listed
        this.movies[index].isListed = false;
      }

      this.moviesSubject.next(this.movies);
    }

    
    this.saveWatchList();
  }
}
