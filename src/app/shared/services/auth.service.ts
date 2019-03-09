import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class AuthService {

  constructor() { }

  getAuthToken() {
    return localStorage.getItem('auth-token') || null;
  }

  setAuhToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  getUserRole() {
    return localStorage.getItem('user-role');
  }

  getUserInfo() {
    const token = this.getAuthToken();
    return JSON.parse(atob(token.split('.')[1]))
  }

  setUserRole(isAdmin) {
    return localStorage.setItem('user-role', (isAdmin === 'Admin' ? 'admin' : 'user').toString());
  }

  refreshToken(): Observable<string> {
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */

    return of('new-token-string').pipe(delay(200));
  }
}
