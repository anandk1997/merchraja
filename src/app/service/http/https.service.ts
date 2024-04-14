import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpsService {
  constructor(private http: HttpClient) {}

  checkPinCode(code: number): Observable<any> {
    return this.http.get(`https://api.postalpincode.in/pincode/${code}`);
  }
}
