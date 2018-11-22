import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  /**
   * Returns the item from the localStorage
   * @param {string} item
   * @returns {string}
   */
  getItem(item: string): string {
    return localStorage.getItem(item);
  }

  /**
   * Set the value to localStorage
   * @param {string} key
   * @param {string} val
   * @returns {void}
   */
  setItem(key: string, val: string): void {
    localStorage.setItem(key, val);
  }
}
