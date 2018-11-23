import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { MovieComponent } from './components/movie/movie.component';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    let userServiceStub = {
      sessionUser: {},
      getSessionUser: () => this.sessionUser,
      getFirebaseUserKey: () => 'users/123',
      login: () => {
        console.log(this);
        // this.sessionUser.id = 123;
      }
    };

    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
        AngularFireDatabaseModule,
        NgbDropdownModule,
        ServiceWorkerModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        SearchFilterComponent,
        SearchResultsComponent,
        WatchlistComponent,
        MovieComponent
      ],
      providers: [ { provide: UserService, useValue: userServiceStub } ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    hostElement = fixture.debugElement.nativeElement;
    
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a child component 'app-header'`, () => {
    expect(hostElement.querySelector('app-header')).not.toBe(null);
  });

  it(`should have a child component 'app-search-results'`, () => {
    expect(hostElement.querySelector('app-search-results')).not.toBe(null);
  });

  it(`should have a child component 'app-watchlist'`, () => {
    expect(hostElement.querySelector('app-watchlist')).not.toBe(null);
  });
});
