import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './email-verification.component.html',

})
export class EmailVerificationComponent {
  isLinkValid: boolean;
  isLoadingResult: boolean;
  emailAlreadyConfirmed: boolean;
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
          this.isLinkValid = data.body
        }
        ,
        err => {
          if (err.error.message.startsWith('email already confirmed')) {
            this.emailAlreadyConfirmed = true;
          }
          this.isLinkValid = false
          this.isLoadingResult = false;
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
          console.log(data)
          this.notificationService.showNotification(
            { title: 'Success', type: 'SUCCESS', message: data.body.message });
        }
        ,
        err => {
          this.isLoadingResult = false;
          console.log(err)
        }
      );
    }
  }
}
