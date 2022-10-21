import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-verification-popup',
  templateUrl: './verification-popup.component.html',
})
export class VerificationPopupComponent {
  private state: string;
  messageTitle: string = '';
  message: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VerificationPopupComponent>
  ) {
    this.state = data.state;
    this.messageTitle = data.messageTitle;
    this.message = data.message;
  }

  onClose(result: boolean): void {
    this.dialogRef.close(result);
  }

  /**
   * Getter $state
   * @return {string}
   */
  public get $state(): string {
    return this.state;
  }

  /**
   * Setter $state
   * @param {string} value
   */
  public set $state(value: string) {
    this.state = value;
  }

  /**
   * Getter $message
   * @return {string}
   */
  public get $message(): string {
    return this.message;
  }

  /**
   * Setter $message
   * @param {string} value
   */
  public set $message(value: string) {
    this.message = value;
  }

  /**
   * Getter $messageTitle
   * @return {string}
   */
  public get $messageTitle(): string {
    return this.messageTitle;
  }

  /**
   * Setter $messageTitle
   * @param {string} value
   */
  public set $messageTitle(value: string) {
    this.messageTitle = value;
  }

}
