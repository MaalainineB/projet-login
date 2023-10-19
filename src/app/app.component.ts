import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService:AuthService ) {

  }

  ngOnInit(): void {
    this.authService.refreshAccessToken()
  }


}
