import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ValidationHelper } from '../validation.model';

@Component({
  selector: 'control-message',
  templateUrl: './control-message.component.html',
})
export class ControlMessageComponent {
  @Input() control: UntypedFormControl;

  constructor() {}

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        return ValidationHelper.getValidatorErrorMessage(propertyName);
      }
    }
    return null;
  }
}
//
