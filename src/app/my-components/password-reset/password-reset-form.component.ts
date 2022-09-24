import { HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { NotificationService } from 'src/services/notification.service';
import { GenericComponent } from '../generic.component';


@Component({
  selector: 'app-password-reset-form',
  templateUrl: './password-reset-form.component.html',
})
export class PasswordResetFormComponent extends GenericComponent implements OnInit, OnDestroy {
  password: string;
  showPassword = false;
  showConfirmPassword = false;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('confirmPasswordInput') confirmPasswordInput: ElementRef;
  form: UntypedFormGroup;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private formBuilder: UntypedFormBuilder,) {
    super();
  }

  ngOnInit(): void {
    this.password = 'password';
    this.form = this.formBuilder.group({
      password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
      confirmPassword: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(30)])],
    },
      {
        validators: this.ConfirmPasswordValidator("password", "confirmPassword")
      });
  }

  ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName]
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmPasswordValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onPasswordReset(email: any) {
    this.subscriptions.add(this.authenticationService.passwordReset(email).subscribe(
      (response: any) => {
        //this.router.navigateByUrl('/home');
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
    return true
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
