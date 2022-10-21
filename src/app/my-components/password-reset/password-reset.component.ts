import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';
import { GenericComponent } from '../generic.component';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent extends GenericComponent implements OnInit, OnDestroy {

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void { }

  onPasswordReset(email: any) {
    this.subscriptions.add(this.authenticationService.passwordReset(email).subscribe(
      (response: any) => {
        this.router.navigateByUrl('/login');
        this.notificationService.showNotification(
          { title: 'Success', type: 'SUCCESS', message: response.message });
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse)
        this.notificationService.showNotification(
          { title: 'Error', type: 'ERROR', message: errorResponse.error.message });
      }
    )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
