import { Component, OnInit, OnDestroy, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/model/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';
import { GenericComponent } from '../generic.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent extends GenericComponent implements OnInit, OnDestroy {
  isSuccessful: boolean = false;
  isLoadingResult: boolean;
  password: string;
  show = false;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService) {
    super();
  }

  ngOnInit(): void {
    this.password = 'password';
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
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

  onRegister(user: User): void {
    this.isLoadingResult = true;
    this.subscriptions.add(this.authenticationService.register(user).subscribe(
      (response: User) => {
        this.isLoadingResult = false;
        this.isSuccessful = true;
      },
      (errorResponse: HttpErrorResponse) => {
        this.isLoadingResult = false;
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
