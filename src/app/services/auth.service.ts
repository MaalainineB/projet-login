import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

    // Store the token in local storage
    setToken(token: string) {
      localStorage.setItem('token', token);
    }
  
    // Retrieve the token from local storage
    getToken() {
      return localStorage.getItem('token');
    }
  
    // Remove the token from local storage
    removeToken() {
      localStorage.removeItem('token');
    }
}
