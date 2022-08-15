import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './email-verification.component.html',

})
export class EmailVerificationComponent {
  isLinkValid: boolean;
  isLoadingResult: boolean;
  emailAlreadyConfirmed: boolean;

  code: string | null = '';
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }
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
}
