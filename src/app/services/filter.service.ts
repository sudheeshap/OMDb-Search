import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  types: string[] = ['movie', 'series'];
  years: string[] = ['2018', '2017', '2016', '2015'];

  constructor() { }

  /**
   * Returns 'types' as sequence of strings
   * @returns {Observable<string[]>}
   */
  getTypes(): Observable<string[]> {
    return of(this.types);
  }

  /**
   * Returns 'years' as sequence of strings
   * @returns {Observable<string[]>} 
   */
  getYears(): Observable<string[]> {
    return of(this.years);
  }
}
