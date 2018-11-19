import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        SearchFilterComponent,
        SearchResultsComponent,
        WatchlistComponent
      ],
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
