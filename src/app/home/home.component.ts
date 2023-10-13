import { Component, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userProfileData: any; // Variable to store user profile data


      constructor(private userService:UserService, private authService:AuthService ) {
        
      }

  // ngOnInit(): void {
  //   this.userService.getUserProfile(this.authService.getToken())
  //   .pipe (
  //     catchError((er: HttpErrorResponse) => {
  //       console.log(er.message)
  //       return throwError(() => er)
  //     })
  //   )
  //     .subscribe ((resp: any) => {
  //       console.log(resp)
  //       if(!resp.er) {
  //         console.log(resp); 
  //       }
  //     })
  // }

  // ngOnInit(): void {
  //   // Retrieve the token from AuthService
  //   const token = this.authService.getToken();

  //   if (token) {
  //     // Make the request with the token
  //     this.userService.getUserProfile(token)
  //       .pipe(
  //         catchError((error: HttpErrorResponse) => {
  //           console.log(error.message);
  //           return throwError(() => error);
  //         })
  //       )
  //       .subscribe((response: any) => {
  //         console.log(response);
  //         if (!response.er) {
  //           console.log(response);
  //         }
  //       });
  //   }
  // }
  
  ngOnInit(): void {
    // Retrieve the token from AuthService
    const token = this.authService.getToken();

    if (token) {
      // Make the request with the token
      this.userService.getUserProfile(token)
      .subscribe(
        (data) => {
          this.userProfileData = data;
          console.log('User Profile Data:', this.userProfileData);
        },
        (error) => {
          console.error('Error retrieving user profile:', error);
        }
      );
    }
  }

      
      
}
