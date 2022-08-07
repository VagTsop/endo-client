import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/enum/header-type.enum';
import { NotificationType } from 'src/enum/notification-type.enum';
import { User } from 'src/model/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isUserloggedIn: boolean;
  @Output() onSendIsUserLoggedIn = new EventEmitter();
  public showLoading: boolean;
  subscriptions: Subscription[] = [];
  public userLoggedIn: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.isUserloggedIn = true
       this.onSendIsUserLoggedIn.emit(true);
      this.router.navigateByUrl('/home');
    } else {
      this.isUserloggedIn = false;
      this.router.navigateByUrl('/public');
    }
  }

  public onLogin(user: User): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<any>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN) as any;
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/home');
          this.onSendIsUserLoggedIn.emit(true);
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.showNotification(
        { title: 'Success', type: 'SUCCESS', message: message, });
      // this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.showNotification(
        { title: 'Error', type: 'ERROR', message: "An error occurred. Please try again.", });
      // this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
