import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericComponent } from '../generic.component';


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
})
export class PasswordResetComponent extends GenericComponent implements OnInit, OnDestroy {

  constructor() {
    super();
  }

  ngOnInit(): void {

  }

  onPasswordReset(item: any) {

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
