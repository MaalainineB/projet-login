import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


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



  constructor(private formBuilder: FormBuilder, private service:UserService, private router: Router) {
    
  }

    submit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value
      // console.log(formData)
      this.service.login(formData)
      .pipe (
        catchError((er: HttpErrorResponse) => {
          console.log(er.message)
          return throwError(() => er)
        })
      )
        .subscribe ((resp: any) => {
          console.log(resp)
          if(!resp.er) {
            this.router.navigate(['/home'])
          }
        })
    }

  }

}


