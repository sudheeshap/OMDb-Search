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

  describe('getTypes', () => {
    it('should return observable of types', () => {
      expect(service.getTypes().subscribe((types) => {
        expect(types).toEqual(service.types);
      }));
    });
  });

  describe('getYears', () => {
    it('should return observable of years', () => {
      expect(service.getYears().subscribe((types) => {
        expect(types).toEqual(service.years);
      }));
    });
  });
});
