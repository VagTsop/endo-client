import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstrumentService } from 'src/services/instrument.service';
import { GenericComponent } from '../../generic.component';

@Component({
  selector: 'app-instrument-series-scanner',
  templateUrl: './instrument-series-scanner.component.html',
  providers: [InstrumentService]

})
export class InstrumentSeriesScannerComponent extends GenericComponent implements OnInit, OnDestroy {

  constructor(private instrumentService: InstrumentService ) {
    super();
  }

  ngOnInit(): void {
  }

  onFetchInstrumentsByInstrumentSeriesCode(qrCode: any) {
    this.subscriptions.add(this.instrumentService.fetchInstrumentsByInstrumentSeriesCode(qrCode)
      .subscribe(res => {
        this.modelList = res;
        this.req.$paging.$totalSize = res.totalElements;
      }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
