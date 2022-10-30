import { FormGroup } from "@angular/forms";

export class CustomValidator {

  static getValidatorErrorMessage(validatorName: string) {
    const config = {
      'required': 'Field is required',
      'minlength': 'Minimum Characters Must Be 6',
      'maxlength': 'Maximum Characters Must Be 30',
      'confirmPasswordValidator': 'Passsword and Confirm Password did not match.',
      'invalidEmailAddress': 'Invalid email address',
    };

    return config[validatorName];
  }

  static ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
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

  static emailValidator(control) {
    if (control.value != null && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }
}
