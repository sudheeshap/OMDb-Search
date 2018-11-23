import { Movie } from 'src/app/models/movie.model';
import { Query } from './../models/query.model';
import { environment } from './../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';

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
        MovieService
      ]
    }
    );

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
        let searchResultMovies: Movie[] = <Movie[]>[{
            Poster: 'ab',
            Title: 'ABC',
            isListed: false
          },
          {
            Poster: 'xy',
            Title: 'XYZ',
            isListed: false
        }];
        service.watchList = <Movie[]>[{
          Poster: 'ab',
          Title: 'ABC',
          isListed: true
        }];

        service.getSyncedSearchList(searchResultMovies);
        expect(searchResultMovies[0].isListed).toBe(true);
      });
    });

    // describe('#loadNextPage', () => {
    //   it('should increment query.page', () => {
    //     let query: Query = service.searchTerms.getValue();
    //     query.page = 1;
    //     service.loadNextPage();
    //     query = service.searchTerms.getValue();
    //     expect(query.page).toBe(2);
    //   });
    // });
  });
});
