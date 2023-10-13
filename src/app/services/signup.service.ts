import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  constructor(private http: HttpClient) { }

  signUp(formData:any): Observable<any> {
    let option:any
    return this.http.post<any>('http://localhost:8080/auth/addNewUser', formData)
  }
}
