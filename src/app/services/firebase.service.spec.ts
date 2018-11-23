import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';

import { FirebaseService } from './firebase.service';
import { environment } from './../../environments/environment';

describe('FirebaseService', () => {
  let firebaseService: FirebaseService;
  let angularFireDatabaseSpy: jasmine.SpyObj<AngularFireDatabase>;
  
  beforeEach(() => {
    const angularFireDatabaseStub: Partial<AngularFireDatabase> = {
      list: jasmine.createSpy('list').and.callFake((path: string) => {
        return {
          set: jasmine.createSpy('set').and.callFake(
            (key: string, value: any) => console.log(key, value)
          )
        };
      })
    };

    TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebase, 'movie-search'),
      AngularFireDatabaseModule
    ],
    providers: [
      FirebaseService,
      { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }
    ]
    });

    firebaseService = TestBed.get(FirebaseService);
    angularFireDatabaseSpy = TestBed.get(AngularFireDatabase);
  });

  it('should be created', () => {
    const service: FirebaseService = TestBed.get(FirebaseService);
    expect(service).toBeTruthy();
  });
  
  it('#getDatabase should return the firebase database', () => {
    expect(firebaseService.getDatabase()).toBe(angularFireDatabaseSpy);
  });

  it('#setValue should set the value to firebase path', () => {
    firebaseService.setValue('users/123', 'isLoggedIn', false);
    expect(angularFireDatabaseSpy.list).toHaveBeenCalled();
    expect(angularFireDatabaseSpy.list().set).toBeTruthy();
  });
});
