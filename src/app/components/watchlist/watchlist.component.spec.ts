import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MovieService } from './../../services/movie.service';
import { environment } from './../../../environments/environment';
import { MovieComponent } from './../movie/movie.component';
import { WatchlistComponent } from './watchlist.component';

describe('WatchlistComponent', () => {
  let component: WatchlistComponent;
  let fixture: ComponentFixture<WatchlistComponent>;
  let movieService: MovieService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
        AngularFireDatabaseModule
      ],
      declarations: [
        WatchlistComponent,
        MovieComponent
      ]
    })
    .compileComponents();

    movieService = TestBed.get(MovieService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(movieService, 'getWatchList').and.callThrough();
    spyOn(movieService.watchListSubscription, 'unsubscribe').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should call movieService.getWatchList', () => {
      component.ngOnInit();
      expect(movieService.getWatchList).toHaveBeenCalled();
    });
  });

  describe('#ngOnDestroy', () => {
    it('should unsubscribe movieService.watchListSubscription', () => {
      component.ngOnDestroy();
      expect(movieService.watchListSubscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
