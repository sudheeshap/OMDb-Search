import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { localStorageMock } from './local-storage.service.mock';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);

    TestBed.configureTestingModule({});

    service = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getItem should return the value from localStorage', () => {
    service.setItem('name', 'Anna');
    expect(service.getItem('name')).toBe('Anna');
  });

  it('#setItem should set the value to localStorage', () => {
    service.setItem('name', 'Anna');
    expect(service.getItem('name')).toBe('Anna');
  });
});
