import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  errorMessage: string = "";

  constructor(private http:HttpClient) { }

  login(formData: any) {
    this.http.post<any>('http://localhost:8080/auth/generateToken', formData).subscribe( {
      next:  (response: any) => {
        console.log(formData);
      }, error: (error) => {
        // Gérez l'erreur d'authentification ici en définissant le message d'erreur.
        console.error("Erreur d'authentification : ", error);
        this.errorMessage = "Nom d'utilisateur ou mot de passe est incorrect.";
      }
    });
}
}
