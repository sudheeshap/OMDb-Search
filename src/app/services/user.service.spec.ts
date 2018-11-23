import { TestBed } from '@angular/core/testing';

import { FirebaseService } from './firebase.service';
import { User } from './../models/user.model';
import { UserService } from './user.service';
import { FirebaseServiceMock } from './firebase.service.mock';
import { localStorageMock } from './local-storage.service.mock';
import { LocalStorageService } from './local-storage.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        UserService,
        { provide: FirebaseService, useClass: FirebaseServiceMock },
        { provide: LocalStorageService, useValue: localStorageMock }
      ]
    });

    service = TestBed.get(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getSessionUser should return sessionUser', () => {
    const sessionUser = <User>{id: 'x8'};
    service.sessionUser = sessionUser;
    expect(service.getSessionUser()).toBe(sessionUser);
  });

  it('#getFirebaseUserKey should return sessionUser firebase key', () => {
    const sessionUser = <User>{id: 'x8'};
    service.sessionUser = sessionUser;
    expect(service.getFirebaseUserKey()).toBe(`/users/${sessionUser.id}`);
  });

  it('#login should get sessionUser id from firebase database', () => {
    service.login();
    expect(service.sessionUser.id).not.toBeNull();
  });

  it('#login should set sessionUser id to localStorage', () => {
    service.login();
    expect(localStorageMock.getItem('user-id')).toBe(service.sessionUser.id);
  });
});
