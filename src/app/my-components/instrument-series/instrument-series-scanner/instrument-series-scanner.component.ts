import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstrumentSeriesService } from 'src/services/instrument-series.service';
import { GenericComponent } from '../../generic.component';
import { InstrumentSeriesDetailsPopupComponent } from '../instrument-series-detaills-popup/instrument-series-details-popup.component';

@Component({
  selector: 'app-instrument-series-scanner',
  templateUrl: './instrument-series-scanner.component.html',
  providers: [InstrumentSeriesService]

})
export class InstrumentSeriesScannerComponent extends GenericComponent implements OnInit, OnDestroy {

  constructor(
    private instrumentSeriesService: InstrumentSeriesService,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
  }

  onFetchInstrumentsByInstrumentSeriesCode(qrCode: string) {
    this.subscriptions.add(this.instrumentSeriesService.fetchInstrumentsByInstrumentSeriesCode(qrCode)
      .subscribe(res => {
        this.modelList = res;
        this.onInstrumentSeriesDetails()
      }
      )
    );
  }

  onInstrumentSeriesDetails() {
    const dialogRef = this.dialog.open(InstrumentSeriesDetailsPopupComponent, {
      panelClass: 'custom-form-dialog-container',
      data:
      {
        item: this.modelList
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
