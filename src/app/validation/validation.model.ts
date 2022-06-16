export class ValidationHelper {

  static getValidatorErrorMessage(validatorName: string) {
    const config = {
      'required': 'Field is required'
    };

    return config[validatorName];
  }
}
