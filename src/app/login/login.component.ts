import { Component } from '@angular/core';
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

  constructor(private formBuilder: FormBuilder, private userService:UserService, private router: Router, private authService:AuthService) {
    
  }

    submit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value
      // console.log(formData)
      this.authService.login(formData)
      .pipe (
        catchError((er: HttpErrorResponse) => {
          console.log(er.message)
          return throwError(() => er)
        })
      )
        .subscribe ((resp: any) => {
          console.log(resp)
          if(!resp.er) {
            this.authService.setToken(resp)
            localStorage.setItem('loggedIn','true')
            const tokenInfo = this.userService.getDecodedAccessToken(resp); // decode token
            const expireDate = tokenInfo.exp; // get token expiration dateTime
            console.log(tokenInfo); // show decoded token object in console
            console.log(expireDate); 
            this.router.navigate(['/home'])
            const usernameConnected = this.userService.getUserProfile(resp)
            console.log("***"+ JSON.stringify(usernameConnected))
            console.log("je suis làààààààààààààààààààààààààààààààà")
            this.authService.isTokenValid()
          }
        })
    }

  }

  

}


