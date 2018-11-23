import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';

import { FirebaseService } from './firebase.service';
import { environment } from './../../environments/environment';
import { FirebaseServiceMock } from './firebase.service.mock';

describe('FirebaseService', () => {
  let firebaseService: FirebaseServiceMock;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
      AngularFireDatabaseModule
    ],
    providers: [
      { provide: FirebaseService, useClass: FirebaseServiceMock },
      { provide: AngularFireDatabase, useValue: new FirebaseServiceMock().db }
    ]
    });

    firebaseService = TestBed.get(FirebaseService);
  });

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });
  
  it('#getDatabase should return the firebase database', () => {
    expect(firebaseService.getDatabase()).toBe(firebaseService.db);
  });

  it('#setValue should set the value to firebase path', () => {
    firebaseService.setValue('users/123', 'isLoggedIn', false);
    expect(firebaseService.store['isLoggedIn']).toBe(false);
  });
});
