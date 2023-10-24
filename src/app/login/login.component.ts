import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  usernameConnected: string = "ee"
  isLoggedIn:string = "false";
  error: string = ''; // Variable pour le message d'erreur


  constructor(private formBuilder: FormBuilder, private router: Router, private authService:AuthService) {
    
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      // console.log(formData)
      this.authService.login(formData)
        .pipe(
          catchError((er: HttpErrorResponse) => {
            this.error = "Nom d'utilisateur ou mot de passe est incorrect"; 
            return throwError(() => er); 
          })
        )
        .subscribe((resp: any) => {
          console.log(resp);
          if (!resp.er) {
            this.authService.setToken(resp);
            localStorage.setItem('loggedIn', 'true');
            const tokenInfo = this.authService.getDecodedAccessToken(resp); 
            console.log(tokenInfo); 
            this.router.navigate(['/home']);
          }
        });
    }
  }

}


