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
  sessionUser: User = <User>{};
  private users: AngularFireList<User>;
  
  constructor(
    private localStorageService: LocalStorageService,
    private firebaseService: FirebaseService
  ) {}
  
  /**
   * Returns the session user
   * @returns {User}
   */
  getSessionUser(): User {
    return this.sessionUser;
  }
  
  /**
   * Returns the firebase key for the session user
   * @returns {string}
   */
  getFirebaseUserKey(): string {
    return `/users/${this.sessionUser.id}`;
  }
  
  /**
   * Get or set the session user ID if not available in local storage
   * @returns {void}
   */
  login(): void {

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
      }
    }
  }
}
