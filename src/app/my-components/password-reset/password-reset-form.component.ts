import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';
import { GenericComponent } from '../generic.component';
import { CustomValidator as customValidator } from '../../validation/custom-validator.component';

@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
})
export class PasswordResetFormComponent extends GenericComponent implements OnInit, OnDestroy {
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: ElementRef;
  password: string;
  showPassword = false;
  showConfirmPassword = false;
  code: any = '';
  form: UntypedFormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private formBuilder: UntypedFormBuilder
  ) {
    super();
  }

  ngOnInit(): void {
    this.password = 'password';
    this.form = this.formBuilder.group({
      password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
      confirmPassword: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
    },
      {
        validators: customValidator.ConfirmPasswordValidator("password", "confirmPassword")
      });
  }

  onChangePassword(password: string) {
    this.code = this.route.snapshot.paramMap.get('code');
    this.subscriptions.add(this.authenticationService.changePassword(this.code, password).subscribe(
      (response: any) => {
        this.router.navigateByUrl('/login');
        this.notificationService.showNotification(
          { title: 'Success', type: 'SUCCESS', message: response.body.message });
      },
      (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse)
        this.notificationService.showNotification(
          { title: 'Error', type: 'ERROR', message: errorResponse.error.message });
      }
    )
    );
  }

  onClickPassword() {
    if (this.passwordInput.nativeElement.type === 'password') {
      this.passwordInput.nativeElement.type = 'text';
      this.showPassword = true;
    } else {
      this.passwordInput.nativeElement.type = 'password'
      this.showPassword = false;
    }
  }

  onClickConfirmPassword() {
    if (this.confirmPasswordInput.nativeElement.type === 'password') {
      this.confirmPasswordInput.nativeElement.type = 'text';
      this.showConfirmPassword = true;
    } else {
      this.confirmPasswordInput.nativeElement.type = 'password';
      this.showConfirmPassword = false;
    }
  }

  onResetPassword() {
    return true;
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
