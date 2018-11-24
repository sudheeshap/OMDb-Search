import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireModule } from '@angular/fire';

import { SearchFilterComponent } from './../search-filter/search-filter.component';
import { HeaderComponent } from './header.component';
import { environment } from './../../../environments/environment';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        // HttpClientModule,
        // AngularFireDatabaseModule
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
        AngularFireDatabaseModule
      ],
      declarations: [
        HeaderComponent,
        SearchFilterComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    hostElement = fixture.debugElement.nativeElement;
    
    fixture.detectChanges();
  });

  it('should create the header', () => {
    expect(component).toBeTruthy();
  });

  it('should have a logo', () => {
    expect(hostElement.querySelector('.logo')).not.toBe(null);
  });

  it(`should have a child component 'app-search-filter'`, () => {
    expect(hostElement.querySelector('app-search-filter')).not.toBe(null);
  });
});
