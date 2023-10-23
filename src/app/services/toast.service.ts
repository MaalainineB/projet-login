import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private router:Router) { }

  private toastMessage = new BehaviorSubject<string>(''); // Initial value
  private isToastVisible = new BehaviorSubject<boolean>(false);
  toastMessage$ = this.toastMessage.asObservable();
  isToastVisible$ = this.isToastVisible.asObservable();

  updateToastMessage(newStatus: string, expirationTime: number) {
    this.toastMessage.next(newStatus);
    let remainingTime = expirationTime;
    
    // Create a countdown timer using RxJS
    const countdown$ = interval(1000).pipe(
      takeWhile(() => remainingTime > 0)
    );

    countdown$.subscribe(() => {
      remainingTime--;
      if (remainingTime === 0) {
          localStorage.removeItem('token');
          localStorage.setItem('loggedIn', 'false');
          this.router.navigate(["/login"])
          console.log("déconnecté")
        } 
        else if (remainingTime === 15) {
          this.updateToastVisibility(true);
        }      
      this.toastMessage.next(`Il vous reste ${remainingTime}s avant d'être déconnecté, cliquez sur le bouton à côté pour rester connecté`);
    });
  }

  public updateToastVisibility(newStatus: boolean) {
    this.isToastVisible.next(newStatus);
  }
}
