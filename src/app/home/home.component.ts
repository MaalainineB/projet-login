import { Component, HostListener, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  userProfileData: any; // Variable to store user profile data


      constructor(private userService:UserService, private authService:AuthService ) {
        
      }

      @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
  }

  private isTimeoutStarted = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isTimeoutStarted) {
      this.isTimeoutStarted = true;
      setTimeout(() => {
        console.log(e);
        this.isTimeoutStarted = false;
      }, 2000);
    }
  }
  

  @HostListener('document:click', ['$event'])
  onMouseclick(e : MouseEvent) {
    this.authService.refreshAccessToken()
    console.log(e);
  }

        
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

  logOut(){
    this.authService.logOut();
  }
}
