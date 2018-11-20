import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private db: AngularFireDatabase) { }

  getDatabase() {
    return this.db;
  }

  setValue(path: string, key: string, value: any) {
    this.db.list(path).set(key, value);
  }
}
