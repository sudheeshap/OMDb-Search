import { Movie } from 'src/app/models/movie.model';
import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { DatabaseReference } from '@angular/fire/database/interfaces';

import { User } from './../models/user.model';
import { FirebaseService } from './firebase.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private sessionUser: User = <User>{};
  private users: AngularFireList<User>;

  constructor(
    private localStorageService: LocalStorageService,
    private firebaseService: FirebaseService) {}

  getSessionUser() {
    return this.sessionUser;
  }

  getFirebaseUserKey() {
    return `/users/${this.sessionUser.id}`;
  }

  login() {

    if (this.localStorageService.getItem('user-id')) {
      // Session user ID
      this.sessionUser.id = this.localStorageService.getItem('user-id');
    } else {
      this.users = this.firebaseService.getDatabase().list('/users');
      const newRef: DatabaseReference = this.users.push(<User>{
        watchlist: [] 
      });

      if (newRef.key) {
        this.localStorageService.setItem('user-id', newRef.key);
        
        // Session user ID
        this.sessionUser.id = newRef.key;
        
        console.log(newRef, newRef.key);
      }
    }
  }
}
