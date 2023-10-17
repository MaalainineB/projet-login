import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

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

    logOut() {
      this.removeToken()
      this.router.navigate(["/login"])
    }
}
