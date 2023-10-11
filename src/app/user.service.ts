import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(formData: any) {
    this.http.post<any>(`http://localhost:8080/login`,formData).subscribe( () => {console.log("ça marche")})
    
  }
}
