import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router:Router) {}

  getUserProfile(token: any) {
    // Create headers with the Authorization header containing the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Include the headers in the HTTP request
    const options = { headers: headers };

    // Make the request to the back-end
    return this.http.get('http://localhost:8080/auth/userdetails', options);
  }

  canActivate(): boolean {
    if (localStorage.getItem('loggedIn') === 'true') {
      this.router.navigate(['/home']);
      return false; // L'utilisateur est connecté
    } else {
      return true; // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    }
  }
}
