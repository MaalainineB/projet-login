import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private http:HttpClient) { }

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
      localStorage.setItem('loggedIn', 'false');
      this.router.navigate(["/login"])
    }

    static isLoggedIn() {
      return localStorage.getItem('loggedIn')
    }

    canActivate(): boolean {
      if (localStorage.getItem('loggedIn') === 'true') {
        return true; // L'utilisateur est connecté
      } else {
        this.router.navigate(['/login']);
        return false; // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
      }
    }

    login(formData: any): Observable<any> {
      let options:any = {responseType: 'text' }
      //option {...option, responseType: 'text' } est un objet  qui contient les options de la requette, la reponse de la requette sera traité comme un text.
      return this.http.post<any>('http://localhost:8080/auth/generateToken', formData, options)
    }

    isTokenValid(){
      try {
        // Récupérer le jeton depuis le localStorage
        const token = localStorage.getItem('token');

        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          
          // Durée de validité du jeton en secondes (par exemple, 3600 secondes = 1 heure)
          const tokenValidityDuration = 3600;

          // Timestamp actuel en secondes
          const currentTimestamp = Date.now() / 1000;

          // Vérifier si le jeton est expiré
          if (decodedToken.iat && currentTimestamp - decodedToken.iat > tokenValidityDuration) {
            console.log('Le jeton a expiré.');
          } else {
            console.log('Le jeton est valide.');
            // Vous pouvez autoriser l'accès aux ressources protégées ici
          }
} else {
  console.log('Aucun jeton trouvé dans le localStorage.');
}
      } catch (error) {
        // Token decoding error
        console.error('Token decoding error:', error);
      }
    }

}
