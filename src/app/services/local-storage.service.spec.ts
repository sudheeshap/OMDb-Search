import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    const localStorageStub: object = {
      store: {},
      getItem: (key: string) => this.store[key],
      setItem: (key: string, val: string) => this.store[key] = val
    };

    TestBed.configureTestingModule({
      providers: [ { provide: localStorage, useValue: localStorageStub } ]
    })
  });

  it('should be created', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    expect(service).toBeTruthy();
  });

  it('#getItem should return the value from localStorage', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    service.setItem('name', 'Anna');
    expect(service.getItem('name')).toBe('Anna');
  });

  it('#setItem should set the value to localStorage', () => {
    const service: LocalStorageService = TestBed.get(LocalStorageService);
    service.setItem('name', 'Anna');
    expect(service.getItem('name')).toBe('Anna');
  });
});
