import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})

export class GenericComponent {

  constructor() { }

  modelList: any = [];
  subscriptions: Subscription = new Subscription();
  req: any;
  selectedRow: any = null;
}
