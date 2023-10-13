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
    return this.http.post<any>('http://localhost:8080/auth/generateToken', formData, {...option, responseType: 'text' })
  }
}
