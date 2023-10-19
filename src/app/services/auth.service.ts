import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient, private toastService:ToastService) { }

  private tokenValidityDuration = 20;

  expiration = (this.tokenValidityDuration - 5) * 1000;

  private refreshTimer: any; // Store the timer ID here

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

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
    let options: any = { responseType: 'text' }
    //option {...option, responseType: 'text' } est un objet  qui contient les options de la requette, la reponse de la requette sera traité comme un text.
    return this.http.post<any>('http://localhost:8080/auth/generateToken', formData, options)
  }

  

  isTokenValid():boolean {
    try {
      // Récupérer le jeton depuis le localStorage
      const token = localStorage.getItem('token');

      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        // Timestamp actuel en secondes
        const currentTimestamp = Date.now() / 1000;

        // Vérifier si le jeton est expiré
        if (decodedToken.iat && currentTimestamp - decodedToken.iat > this.tokenValidityDuration) { //si ledecodedToken.iat existe, ce qui signifie que le champ "iat" existe dans l'objet decodedToken et...
          console.log('Le jeton a expiré.');
          this.logOut()
          this.router.navigate(['/login'])
          return false;
        } else {
          console.log('Le jeton est valide.');
          return true;
        }
      } else {
        console.log('Aucun jeton trouvé dans le localStorage.');
        return false;

      }
    } catch (error) {
      // Token decoding error
      console.error('Token decoding error:', error);
      return false
    }
  }

  refreshAccessToken() {
    // Vérifiez si le token JWT expire bientôt
    const currentToken = this.getToken();
    if (currentToken) {
      if (!this.isTokenValid()) {
        return 
      }
      const decodedToken = this.getDecodedAccessToken(currentToken!);
      if (decodedToken) {
        // Récupérez la date d'émission (iat) du token
        const issuedAt = decodedToken.iat * 1000; // Convertir en millisecondes

        // Calculez la durée de validité du token (par exemple, 1 heure)
        const tokenValidityDuration = 1000 * 2;

        const requestData = { token: currentToken };


        // Vérifiez si le token est sur le point d'expirer
        if (Date.now() - issuedAt > tokenValidityDuration) {
          
          if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
          }

          let options: any = { responseType: 'text' }

          this.http.post('http://localhost:8080/auth/refreshToken', requestData, options)
            .subscribe((data: any) => {
              if (data) {
                this.setToken(data);
                // this.expiration = 20 - 5;
                console.log('Token rafraîchi avec succès.');
                this.refreshTimer = setTimeout(() => {
                    this.toastService.updateToastMessage('Message with countdown', 10); // Set the desired expiration time
                    this.toastService.updateToastVisibility(true);
                    setTimeout(() => {
                      this.toastService.updateToastVisibility(false);
                      this.logOut()
                    }, 10000);
                }, this.expiration);
              } else {
                console.error('Réponse invalide lors du rafraîchissement du token.');
                this.logOut()
              }
            }, (error) => {
              console.error('Erreur lors du rafraîchissement du token :', error);
              this.logOut()
            });
        }
      }
    }
  }

}