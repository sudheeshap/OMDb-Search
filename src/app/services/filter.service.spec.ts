import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTypes should return observable of types', () => {
    service.getTypes().subscribe((types) => {
      expect(types).toEqual(service.types);
    });
  });
  
  it('#getYears should return observable of years', () => {
    service.getYears().subscribe((types) => {
      expect(types).toEqual(service.years);
    });
  });
});
