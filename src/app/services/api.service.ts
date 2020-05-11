import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // api server
  public URL = 'http://0.0.0.0:3000/';

  constructor(public http: HttpClient) {
  }


  signIn(user): Observable<any> {
    return this.http
      .post<any>(`${this.URL}auth/sign_in`, user, {observe: 'response'})
      .pipe(
        (map(response => response)),
        catchError(this.handleError)
      );
  }

  // TODO - to be implemented
  // signUp(user): Observable<any> {
  //   return this.http
  //     .post(`${this.URL}auth`, user)
  //     .pipe(
  //       (map(response => response)),
  //       catchError(this.handleError)
  //     );
  // }

  // TODO - to be implemented
  // getMessages(): Observable<any>{
  //   return this.http
  //     .get(`${this.URL}api/vi/messages`)
  //     .pipe(
  //       (map(response => response)),
  //       catchError(this.handleError)
  //     );
  // }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
