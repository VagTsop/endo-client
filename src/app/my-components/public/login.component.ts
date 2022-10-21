import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderType } from 'src/enum/header-type.enum';
import { User } from 'src/model/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';
import { GenericComponent } from '../generic.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent extends GenericComponent implements OnInit, OnDestroy {
  role: any;
  password: string;
  show = false;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/public');
    }
  }

  onLogin(user: User): void {
    this.subscriptions.add(this.authenticationService.login(user).subscribe(
      (response: HttpResponse<any>) => {
        const token = response.headers.get(HeaderType.JWT_TOKEN) as any;
        this.authenticationService.saveToken(token);
        this.authenticationService.addUserToLocalCache(response.body);
        this.getUserRole();
        if (this.role === 'ROLE_USER') {
          this.router.navigateByUrl('/instrument-series-scanner');
          this.authenticationService.changes.next(this.role);
        } else {
          this.router.navigateByUrl('/home');
          this.authenticationService.changes.next(this.role);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse)
        this.notificationService.showNotification(
          { title: 'Error', type: 'ERROR', message: errorResponse.error.message });
      }
    )
    );
  }

  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }

  getUserRole() {
    this.role = this.authenticationService.getUserFromLocalCache().role
    console.log(this.role);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
