import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  errorMessage: string = "";

  constructor(private http: HttpClient) {}

  login(formData: any): Observable<any> {
    let option:any
    //option {...option, responseType: 'text' } est un objet  qui contient les options de la requette, la reponse de la requette sera traité comme un text.
    return this.http.post<any>('http://localhost:8080/auth/generateToken', formData, {...option, responseType: 'text' })
  }
}
