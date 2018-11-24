import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';

import { SearchResultsComponent } from './search-results.component';
import { MovieComponent } from '../movie/movie.component';
import { MovieService } from 'src/app/services/movie.service';
import { LocalStorageService } from './../../services/local-storage.service';
import { environment } from './../../../environments/environment';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let movieService: MovieService;
  let localStorageService: LocalStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
        AngularFireDatabaseModule
      ],
      declarations: [
        SearchResultsComponent,
        MovieComponent
      ]
    })
    .compileComponents();

    movieService = TestBed.get(MovieService);
    localStorageService = TestBed.get(LocalStorageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.totalResultsSubscription, 'unsubscribe').and.callThrough();
    spyOn(movieService, 'getSearchList').and.callThrough();
    spyOn(movieService.hasMoreResults$, 'subscribe').and.callThrough();
    spyOn(movieService.searchListSubscription, 'unsubscribe').and.callThrough();
    spyOn(movieService, 'loadNextPage').and.callThrough();
    spyOn(localStorageService, 'getItem').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should call movieService.getSearchList', () => {
      expect(movieService.getSearchList).toHaveBeenCalled();
    });
    it('should call localStorageService.getItem', () => {
      expect(localStorageService.getItem).toHaveBeenCalled();
    });
    it('should subscribe to movieService.hasMoreResults$', () => {
      expect(movieService.hasMoreResults$.subscribe).toHaveBeenCalled();
    });
  });

  describe('#ngOnDestroy', () => {
    beforeEach(() => {
      component.ngOnDestroy();
    });
    it('should unsubscribe totalResultsSubscription', () => {
      expect(component.totalResultsSubscription.unsubscribe).toHaveBeenCalled();
    });
    it('should unsubscribe movieService.searchListSubscription', () => {
      expect(movieService.searchListSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('#onClickLoadMore', () => {
    it('should call movieService.loadNextPage', () => {
      component.onClickLoadMore();
      expect(movieService.loadNextPage).toHaveBeenCalled();
    });
  });
});
