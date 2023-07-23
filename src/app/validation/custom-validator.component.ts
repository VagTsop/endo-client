import { FormGroup } from "@angular/forms";

export class CustomValidator {

  static getValidatorErrorMessage(validatorName: string) {
    const config = {
      'required': 'Field is required',
      'minlength': 'Minimum Characters Must Be 6',
      'maxlength': 'Maximum Characters Must Be 30',
      'confirmPasswordValidator': 'Passsword and Confirm Password did not match.',
      'invalidEmailAddress': 'Invalid email address',
      'passwordPolicy': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one numeric digit.'
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

  static passwordPolicyValidator(control) {
    if (!control.value) {
      // If the control value is empty, do not validate
      return null;
    }

    // Regular expressions for checking the password policy criteria
    const regexes = [
      /(?=.*[a-z])/,
      /(?=.*[A-Z])/,
      /(?=.*\d)/,
      /.{8,}/
    ];

    // Check each regex to see if the password meets the criteria
    const valid = regexes.every(regex => regex.test(control.value));

    // If the password does not meet the criteria, return an error
    return valid ? null : { 'passwordPolicy': true };
  }
}
