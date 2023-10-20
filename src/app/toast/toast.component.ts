import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {
  public toastMessage: string = ''; // Initialize with an empty string
  public isToastVisible: boolean = false;

  constructor(private toastService: ToastService, private authService: AuthService) { }

  ngOnInit(): void {
    this.toastService.toastMessage$.subscribe(message => {
      this.toastMessage = message;
    });

    // Add logic to display and auto-hide the toast here
    this.toastService.isToastVisible$.subscribe(visibility => {
      this.isToastVisible = visibility;
    })
  }

  closeToast() {
    this.toastService.updateToastVisibility(false)
  }

  onClick() {
    this.closeToast();
    this.authService.refreshAccessToken();
  }

}
