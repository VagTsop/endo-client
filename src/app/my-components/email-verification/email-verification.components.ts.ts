import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './email-verification.component.html',

})
export class EmailVerificationComponent {
  isLinkValid: boolean;
  code: string | null = '';
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code) {
      console.log(this.code)
      this.authService.verifyCode(this.code).subscribe(
        data => {
          this.isLinkValid = data
        }
        ,
        err => {
          this.isLinkValid = false
        }
      );
    }
  }
}
