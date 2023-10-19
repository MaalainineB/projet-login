import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-token-refresh-toast',
  templateUrl: './token-refresh-toast.component.html',
  styleUrls: ['./token-refresh-toast.component.css']
})
export class TokenRefreshToastComponent {
  @Input() countdown: number;

}
