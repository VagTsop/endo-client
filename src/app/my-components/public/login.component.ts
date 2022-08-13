import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { HeaderType } from 'src/enum/header-type.enum';
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
  subscriptions: Subscription[] = [];
  public userLoggedIn: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/public');
    }
  }

  public onLogin(user: User): void {
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response);
          const token = response.headers.get(HeaderType.JWT_TOKEN) as any;
          this.authenticationService.saveToken(token);
          this.authenticationService.addUserToLocalCache(response.body);
          this.router.navigateByUrl('/home');
        },
        (errorResponse: HttpErrorResponse) => {
          this.notificationService.showNotification(
            { title: 'Error', type: 'ERROR', message: errorResponse.error.message, });
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
