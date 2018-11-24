import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FirebaseService } from './firebase.service';
import { Movie } from 'src/app/models/movie.model';
import { Query } from './../models/query.model';
import { environment } from './../../environments/environment';
import { MovieService } from './movie.service';
import { FirebaseServiceMock } from './firebase.service.mock';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
        AngularFireDatabaseModule
      ],
      providers: [
        MovieService,
        { provide: FirebaseService, useClass: FirebaseServiceMock }
      ]
    });

    service = TestBed.get(MovieService);

    spyOn(service.searchTerms, 'next');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#search', () => {
    const query: Query = <Query>{ page: 5};

    it('should reset query.page to 1', () => {
      service.search(query);
      expect(query.page).toBe(1);
    });

    it('should set service.isLoadMoreActive to false', () => {
      service.search(query);
      expect(service.isLoadMoreActive).toBe(false);
    });

    it('should call  service.searchTerms.next with parameter query', () => {
      service.search(query);
      expect(service.searchTerms.next).toHaveBeenCalledWith(query);
    });
  });

  describe('#loadNextPage', () => {
    it('should increment query.page', () => {
      let query: Query = service.searchTerms.getValue();
      query.page = 1;
      service.loadNextPage();
      query = service.searchTerms.getValue();
      expect(query.page).toBe(2);
    });

    it('should set service.isLoadMoreActive to true', () => {
      const query: Query = service.searchTerms.getValue();
      service.loadNextPage();
      expect(service.isLoadMoreActive).toBe(true);
    });

    it('should call  service.searchTerms.next with parameter query', () => {
      const query: Query = service.searchTerms.getValue();
      service.loadNextPage();
      expect(service.searchTerms.next).toHaveBeenCalledWith(query);
    });

    describe('#getSyncedSearchList', () => {  
      it('should sync the search results with watchlist movies', () => {
        let searchResultMovies: Movie[] = <Movie[]>[
          { Poster: 'ab', Title: 'ABC', isListed: false },
          { Poster: 'xy', Title: 'XYZ', isListed: false }
        ];
        service.watchList = <Movie[]>[{ Poster: 'ab', Title: 'ABC', isListed: true }];

        service.getSyncedSearchList(searchResultMovies);
        expect(searchResultMovies[0].isListed).toBe(true);
      });
    });

    describe('#getSearchList', () => {
      it('should return Observable<Movie[]>', () => {
        let query: Query = <Query>{title: ''};
        service.searchTerms.next(query);
        service.getSearchList().subscribe((movies: Movie[]) => {
          expect(movies.length).toBe(0);
        });
      });
    });
    
    describe('#searchMovies', () => {
      let httpMock;

      beforeEach(() => {
        service = TestBed.get(MovieService);
        httpMock = TestBed.get(HttpTestingController);
      });

      afterEach(() => {
        httpMock.verify();
      });
      it('should return Observable<Movie[]>', () => {
        let query: Query = <Query>{title: 'titanic', type: 'movie'};
        const data: object = {
          Search: <Movie[]>[
            { Poster: 'ab', Title: 'ABC', imdbID: '1', isListed: false },
            { Poster: 'xy', Title: 'XYZ', imdbID: '2', isListed: false }
          ]
        };
    
        service.searchMovies(query)
          .subscribe(res => {
            if (res['Search']) { 
              expect(res['Search'].movies.length).toBe(2);
              expect(res['Search'].movies).toEqual(data);
            }
          })
        ;
        const req = httpMock.expectOne(req => req.url.includes('https://www.omdbapi.com'));
        expect(req.request.method).toBe("GET");
        req.flush(data);
      });
    });

    describe('#addMovie', () => {  
      it('should add movie to the watchlist', () => {
        const movie: Movie = <Movie>{ Poster: 'ab', Title: 'ABC', isListed: false };
        service.watchList = [];
        service.addMovie(movie);
        expect(service.watchList[0]).toBe(movie);
      });
    });

    describe('#removeMovie', () => {  
      it('should add movie to the watchlist', () => {
        const movie: Movie = <Movie>{ Poster: 'ab', Title: 'ABC', isListed: false };
        service.watchList = [movie];
        service.removeMovie(movie);
        expect(service.watchList.length).toBe(0);
      });
    });
  });
});
