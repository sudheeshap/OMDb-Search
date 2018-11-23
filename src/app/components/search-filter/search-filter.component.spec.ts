import { environment } from './../../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterComponent } from './search-filter.component';
import { AngularFireModule } from '@angular/fire';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
        AngularFireDatabaseModule
      ],
      declarations: [ SearchFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    hostElement = fixture.debugElement.nativeElement;
    
    fixture.detectChanges();
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
});
