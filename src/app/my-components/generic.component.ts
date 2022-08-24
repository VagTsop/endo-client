import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { InstrumentSeriesRequest } from 'src/transport/instrument-series.request';
import { InstrumentRequest } from 'src/transport/instrument.request';
import { UserRequest } from 'src/transport/user-request';

@Component({
  template: ''
})

export class GenericComponent {

  constructor() { }

  modelList: any = [];
  subscriptions: Subscription = new Subscription();
  req = new InstrumentRequest();
  instrumentSeriesReq = new InstrumentSeriesRequest();
  userReq = new UserRequest();
  selectedRow: any = null;
}
