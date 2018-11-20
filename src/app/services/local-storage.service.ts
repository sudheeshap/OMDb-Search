import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(item: any) {
    return localStorage.getItem(item);
  }

  setItem(key: string, val: any) {
    return localStorage.setItem(key, val);
  }
}
