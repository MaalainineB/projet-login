import { Component, HostListener, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { isThisTypeNode } from 'typescript';
import { timer } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  userProfileData: any; // Variable to store user profile data

  refreshTimer: any; // Variable pour stocker le timer

  keyBoardClickCompter = 0;
  

    constructor(private userService:UserService, private authService:AuthService ) {
      
    }

    startRefreshTimer() {
      // Vérifiez si un timer est déjà en cours, s'il existe, annulez-le
      if (this.refreshTimer) {
        clearTimeout(this.refreshTimer);
      }
    
      // Démarrez un nouveau timer pour appeler refreshAccessToken après 5 secondes
      this.refreshTimer = setTimeout(() => {
        this.authService.refreshAccessToken();
      }, 5000); // 5 secondes
    }

      @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
    this.keyBoardClickCompter++
    if (this.keyBoardClickCompter >= 10) {
      this.authService.refreshAccessToken()
      this.keyBoardClickCompter = 0
    } else {
      this.startRefreshTimer();
    }
  }

  @HostListener('document:click', ['$event'])
  onMouseclick(e : MouseEvent) {
    this.keyBoardClickCompter++
    console.log(e);
    if (this.keyBoardClickCompter >= 10) {
      this.authService.refreshAccessToken()
      this.keyBoardClickCompter = 0
    } else {
      this.startRefreshTimer();
    }
  }

  // private isTimeoutStarted = false;

  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(e: MouseEvent) {
  //   if (!this.isTimeoutStarted) {
  //     this.isTimeoutStarted = true;
  //     setTimeout(() => {
  //       console.log(e);
  //       this.isTimeoutStarted = false;
  //     }, 2000);
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

  logOut(){
    this.authService.logOut();
  }

  
}
