import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  errorMessage: string = "";

  constructor(private http: HttpClient) {}

  login(formData: any): Observable<any> {
    let options:any = {responseType: 'text' }
    //option {...option, responseType: 'text' } est un objet  qui contient les options de la requette, la reponse de la requette sera traité comme un text.
    return this.http.post<any>('http://localhost:8080/auth/generateToken', formData, options)
  }

  getUserProfile(token: any) {
    // Create headers with the Authorization header containing the token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Include the headers in the HTTP request
    const options = { headers: headers };

    // Make the request to the back-end
    return this.http.get('http://localhost:8080/auth/user/userProfile', options);
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
