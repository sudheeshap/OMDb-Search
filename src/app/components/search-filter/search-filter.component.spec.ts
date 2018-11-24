import { AngularFireDatabaseModule } from '@angular/fire/database';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LocalStorageService } from './../../services/local-storage.service';
import { FilterService } from './../../services/filter.service';
import { environment } from './../../../environments/environment';
import { SearchFilterComponent } from './search-filter.component';
import { MovieService } from 'src/app/services/movie.service';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;
  let hostElement: HTMLElement;
  let filterService: FilterService;
  let movieService: MovieService;
  let localStorageService: LocalStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
        AngularFireDatabaseModule
      ],
      declarations: [ SearchFilterComponent ],
    })
    .compileComponents();

    filterService = TestBed.get(FilterService);
    movieService = TestBed.get(MovieService);
    localStorageService = TestBed.get(LocalStorageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    hostElement = fixture.debugElement.nativeElement;

    fixture.detectChanges();
    
    spyOn(component, 'getTypes').and.callThrough();
    spyOn(component, 'getYears').and.callThrough();
    spyOn(component, 'search').and.callThrough();
    spyOn(component, 'setSearched').and.callThrough();
    spyOn(component.typeSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.yearSubscription, 'unsubscribe').and.callThrough();
    spyOn(movieService, 'search').and.callThrough();
    spyOn(filterService, 'getTypes').and.callThrough();
    spyOn(filterService, 'getYears').and.callThrough();
  });

  it('should create the filter', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a 'type' dropdown`, () => {
    expect(hostElement.querySelector('.dropdown-type')).not.toBe(null);
  });

  it(`should have a 'year' dropdown`, () => {
    expect(hostElement.querySelector('.dropdown-year')).not.toBe(null);
  });

  it(`should have a 'title' input`, () => {
    expect(hostElement.querySelector('.input-title')).not.toBe(null);
  });

  describe('#ngOnInit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });
    it('should call getTypes', () => {
      expect(component.getTypes).toHaveBeenCalled();
    });
    it('should call getYears', () => {
      expect(component.getYears).toHaveBeenCalled();
    });
  });

  describe('#ngOnDestroy', () => {
    beforeEach(() => {
      component.ngOnDestroy();
    });
    it('should unsubscribe typeSubscription', () => {
      expect(component.typeSubscription.unsubscribe).toHaveBeenCalled();
    });
    it('should unsubscribe typeSubscription', () => {
      expect(component.yearSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('#getTypes', () => {
    it('should call filterService.getTypes', () => {
      component.getTypes();
      expect(filterService.getTypes).toHaveBeenCalled();
    });
  });

  describe('#getYears', () => {
    it('should call filterService.getYears', () => {
      component.getYears();
      expect(filterService.getYears).toHaveBeenCalled();
    });
  });

  describe('#search', () => {
    it('should set component.years', () => {
      component.search();
      expect(movieService.search).toHaveBeenCalled();
    });
  });

  describe('#setSearched', () => {
    it('should set  localStorage value has-search', () => {
      component.setSearched();
      expect(localStorageService.getItem('has-search')).toBe('true');
    });
  });

  describe('#onInput', () => {
    it('should call component.search and component.setSearched', () => {
      component.onInput();
      expect(component.search).toHaveBeenCalled();
      expect(component.setSearched).toHaveBeenCalled();
    });
  });

  describe('#onSelectType', () => {
    it('should set query.type to given type', () => {
      component.onSelectType('movie');
      expect(component.query.type).toBe('movie');
    });
    it('should call component.search', () => {
      component.onSelectType('movie');
      expect(component.search).toHaveBeenCalled();
    });
  });

  describe('#onSelectYear', () => {
    it('should set query.type to given type', () => {
      component.onSelectType('2016');
      expect(component.query.type).toBe('2016');
    });
    it('should call component.search', () => {
      component.onSelectType('2016');
      expect(component.search).toHaveBeenCalled();
    });
  });
});
