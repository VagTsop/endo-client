export class ValidationHelper {

  static getValidatorErrorMessage(validatorName: string) {
    const config = {
      'required': 'Field is required',
      'minlength': 'Minimum Characters Must Be 6',
      'maxlength': 'Maximum Characters Must Be 30',
      'confirmPasswordValidator': 'Passsword and Confirm Password did not match.'
    };

    return config[validatorName];
  }
}
