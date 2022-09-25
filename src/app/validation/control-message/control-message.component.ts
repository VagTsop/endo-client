import { Component, Input } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { CustomValidator } from '../custom-validator.component';

@Component({
  selector: 'control-message',
  templateUrl: './control-message.component.html',
})
export class ControlMessageComponent {
  @Input() control: UntypedFormControl;

  constructor() { }

  get errorMessage() {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName)) {
        return CustomValidator.getValidatorErrorMessage(propertyName);
      }
    }
    return null;
  }
}
