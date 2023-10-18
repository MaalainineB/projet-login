import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  constructor(private http: HttpClient, private router:Router) { }

  signUp(formData:any): Observable<any> {
    // let options:any = {responseType: 'text' }
    //option {...option, responseType: 'text' } est un objet  qui contient les options de la requette, la reponse de la requette sera traité comme un text.
    return this.http.post<any>('http://localhost:8080/auth/addNewUser', formData)
  }

}
