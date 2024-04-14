import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private height: BehaviorSubject<string> = new BehaviorSubject('');
  public element$ = this.height.asObservable();
  constructor() {}

  async scrollTo(element: string) {
    this.height.next(element);
  }
}
