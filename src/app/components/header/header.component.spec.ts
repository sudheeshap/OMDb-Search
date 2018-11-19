import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFilterComponent } from './../search-filter/search-filter.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let hostElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    expect(hostElement.querySelector('img.logo')).not.toBe(null);
  });

  it(`should have a child element 'app-search-filter'`, () => {
    expect(hostElement.querySelector('app-search-filter')).not.toBe(null);
  });
});
