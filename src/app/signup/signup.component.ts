import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInfo } from '../interfaces/user-info';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signUpForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    roles: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private signupService: SignupService) {
  }


    onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value
      console.log(formData)
      this.signupService.signUp(formData)
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

    onSubmit2() {
      if (this.signUpForm.valid) {
        const formData = this.signUpForm.value;
        console.log(this.signUpForm.value)
        this.signupService.signUp(formData).pipe(
          catchError((er: HttpErrorResponse) => {
            console.log(er.message);
            return throwError(() => er);
          })
        ).subscribe((resp: any) => {
          console.log(resp);
          if (!resp.er) {
            this.router.navigate(['/login']);
          }
        });
      }
    }
}
