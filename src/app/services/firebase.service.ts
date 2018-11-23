import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  /**
   * Returns the firebase database
   * @returns {AngularFireDatabase}
   */
  getDatabase(): AngularFireDatabase {
    return this.db;
  }

  /**
   * Set a value for a key to the firebase path
   * @param {string} path
   * @param {string} key
   * @param {*} value
   * @returns {void}
   */
  setValue(path: string, key: string, value: any): void {
    this.db.list(path).set(key, value);
  }
}
