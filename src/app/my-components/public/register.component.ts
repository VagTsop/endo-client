import { Component, OnInit, OnDestroy, ContentChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/model/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';
import { GenericComponent } from '../generic.component';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../validation/custom-validator.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent extends GenericComponent implements OnInit, OnDestroy {
  form: UntypedFormGroup;
  isSuccessful: boolean = false;
  isLoadingResult: boolean;
  password: string;
  show = false;

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private formBuilder: UntypedFormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.password = 'password';
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        CustomValidator.emailValidator])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])]
    });
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

  onRegister(): void {
    const user: User = new User();
    user.firstName = this.form.controls.firstName.value,
      user.lastName = this.form.controls.lastName.value,
      user.username = this.form.controls.username.value,
      user.email = this.form.controls.email.value,
      user.password = this.form.controls.password.value,
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
