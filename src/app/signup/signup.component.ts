import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  signUpForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailRegExp)]],
    password: ['', Validators.required],
    roles: ['', Validators.required]
  });
  

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
  }


    onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value
      console.log(formData)
      this.authService.signUp(formData)
      .pipe (
        catchError((er: HttpErrorResponse) => {
          console.log(er.message)
          return throwError(() => er)
        })
      )
        .subscribe ((resp: any) => {
          console.log(resp)
          if(!resp.er) {
            this.router.navigate(['/login'])
          }
        })
      }
    }
}
