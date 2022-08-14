import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './email-verification.component.html',

})
export class EmailVerificationComponent {
  code: string | null = '';
  constructor(private authService: AuthenticationService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    if (this.code) {
      console.log(this.code)
      this.authService.verifyCode(this.code).subscribe(
        data => {
          console.log(data)
        }
        ,
        err => {
          console.log(err)
        }
      );
    }
  }
}
