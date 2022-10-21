import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStatus } from 'src/enum/token-status.enum';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
})
export class EmailVerificationComponent {
  tokenStatus = TokenStatus;
  status: TokenStatus;
  isLoadingResult: boolean;
  code: string | null = '';

  constructor(private router: Router, private authService: AuthenticationService, private route: ActivatedRoute,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.isLoadingResult = true;
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code) {
      this.authService.verifyCode(this.code).subscribe(
        data => {
          this.isLoadingResult = false;
          this.status = TokenStatus[data.body.message as keyof TokenStatus];
        }
      );
    }
  }

  onResendVerificationEmail() {
    this.isLoadingResult = true;
    if (this.code) {
      this.authService.resendToken(this.code).subscribe(
        data => {
          this.isLoadingResult = false;
          this.router.navigateByUrl('/login');
          this.notificationService.showNotification(
            { title: 'Success', type: 'SUCCESS', message: data.body.message });
        }
      );
    }
  }
}
