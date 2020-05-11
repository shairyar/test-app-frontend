import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

const STORED_USER = 'user';
const AUTH_TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private router: Router, ) {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserState());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(response) {
    localStorage.setItem(STORED_USER, JSON.stringify(response.body.data));
    localStorage.setItem(AUTH_TOKEN, response.headers.get('access-token'));
    this.router.navigate(['messages']);
  }

  logout() {
    localStorage.removeItem(STORED_USER);
    localStorage.removeItem(AUTH_TOKEN);
    this.router.navigate(['sign-in']);
  }

  isAuthenticated() {
    this.currentUserSubject = new BehaviorSubject<any>(this.getUserState());
    return this.currentUserSubject.value;
  }

  getUser() {
    return JSON.parse(localStorage.getItem(STORED_USER));
  }

  getToken() {
    return localStorage.getItem(AUTH_TOKEN);
  }

  getUserState() {
    console.log('state', this.getUser() != null && this.getToken() != null);
    return (this.getUser() != null && this.getToken() != null);
  }
}
