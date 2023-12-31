import { Component, HostListener, OnInit} from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../interfaces/user-info';
import { Observable } from 'rxjs';
import { ToastService } from '../services/toast.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  userProfileData: UserInfo = {
    id: 0,
    name: "",
    email: "",
    password: "",
    roles: "",
  } 

  public isToastVisible$: Observable<boolean>;


  refreshTimer: any; // Variable pour stocker le timer

  keyBoardClickCompter = 0;
  
    constructor(private userService:UserService, private authService:AuthService, public toastService: ToastService, private toastr:ToastrService ) {
          this.isToastVisible$ = this.toastService.isToastVisible$;
    }

    startRefreshTimer() {
      // Vérifiez si un timer est déjà en cours, s'il existe, annulez-le
      if (this.refreshTimer) {
        clearTimeout(this.refreshTimer);
      }
    
      // Démarrez un nouveau timer pour appeler refreshAccessToken après 5 secondes
      this.refreshTimer = setTimeout(() => {
        this.authService.refreshAccessToken();
      }, this.authService.GetTokenValidityDuration()*0.25*1000); // 5 secondes
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

  ngOnInit(): void {
    // Retrieve the token from AuthService
    const token = this.authService.getToken();

    if (token) {
      // Make the request with the token
      this.userService.getUserProfile(token)
      .subscribe(
        (data : any) => {
          this.userProfileData = data;
          console.log('User Profile Data:', this.userProfileData);
        },
        (error) => {
          console.error('Error retrieving user profile:', error);
        }
      );
    }
    
    this.authService.refreshAccessToken()
  }

  logOut(){
    this.authService.logOut();
  }
  
}
