import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ToastService } from './toast.service';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient, private toastService:ToastService) { }

  public refreshTimer: any; // Store the timer ID here

  logOut() {
    this.removeToken()
    localStorage.setItem('loggedIn', 'false');
    this.router.navigate(["/login"])
    this.toastService.ToastCancel()
  }

  static isLoggedIn() {
    return localStorage.getItem('loggedIn')
  }

  login(formData: any): Observable<any> {
    let options: any = { responseType: 'text' }
    //option {...option, responseType: 'text' } est un objet  qui contient les options de la requette, la reponse de la requette sera traité comme un text.
    return this.http.post<any>('http://localhost:8080/auth/generateToken', formData, options)
  }

  signUp(formData:any): Observable<any> {
    let options:any = {responseType: 'text' }
    // option {...option, responseType: 'text' } est un objet  qui contient les options de la requette, la reponse de la requette sera traité comme un text.
    return this.http.post<any>('http://localhost:8080/auth/addNewUser', formData, options)
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

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  GetTokenValidityDuration():number {
    try {
    const token = this.getToken();
      if (token) {
        const decodedToken = this.getDecodedAccessToken(token);
        const tokenValidityDuration = decodedToken.exp - decodedToken.iat
        return tokenValidityDuration;
      } else {
         throwError(() => 'Retreiving Token validaty duration error:')
         return 0
           
      }
    }  catch (error) {
      console.error('Retreiving Token validaty duration error:', error);
      return 0;
    }
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
        const TokenValidityDuration = this.GetTokenValidityDuration()

        if (decodedToken.iat && currentTimestamp - decodedToken.iat > TokenValidityDuration) { //si ledecodedToken.iat existe, ce qui signifie que le champ "iat" existe dans l'objet decodedToken et...
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
        const requestData = { token: currentToken };
        let options: any = { responseType: 'text' }

        this.http.post('http://localhost:8080/auth/refreshToken', requestData, options)
          .subscribe((data: any) => {
            if (data) {
              this.setToken(data);
              console.log('Token rafraîchi avec succès.');
              const TokenValidityDuration = this.GetTokenValidityDuration()
              // const toast = this.toastr.success('Hello world!', 'Toastr fun!');
              // toast.onTap.subscribe(() => {
              //   this.toastr.clear(toast.toastId)
              // })
              // this.toastr.show()
              this.toastService.updateToastMessage('Attention', TokenValidityDuration); // temps d'expiration
              
              // this.toastService.updateToastVisibility(false);

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

  canActivate(): boolean {
    if (localStorage.getItem('loggedIn') === 'true') {
      return true; // L'utilisateur est connecté
    } else {
      this.router.navigate(['/login']);
      return false; // L'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    }
  }

}