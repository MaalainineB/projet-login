import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';


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



  constructor(private formBuilder: FormBuilder, private service:UserService) {
    
  }

    submit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value
      this.service.login(formData);
    }

  }

}


