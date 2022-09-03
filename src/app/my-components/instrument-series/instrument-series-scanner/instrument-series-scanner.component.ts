import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstrumentService } from 'src/services/instrument.service';
import { GenericComponent } from '../../generic.component';
import { InstrumentSeriesDetailsPopupComponent } from './instrument-series-detaills-popup/instrument-series-details-popup.component';

@Component({
  selector: 'app-instrument-series-scanner',
  templateUrl: './instrument-series-scanner.component.html',
  providers: [InstrumentService]

})
export class InstrumentSeriesScannerComponent extends GenericComponent implements OnInit, OnDestroy {

  constructor(private instrumentService: InstrumentService, private dialog: MatDialog,) {
    super();
  }

  ngOnInit(): void {
  }

  onFetchInstrumentsByInstrumentSeriesCode(qrCode: any) {
    this.subscriptions.add(this.instrumentService.fetchInstrumentsByInstrumentSeriesCode(qrCode)
      .subscribe(res => {
        this.modelList = res;
        //this.req.$paging.$totalSize = res.totalElements;
        this.onInstrumentSeriesDetails()
      } // here i will pass instrumentseries data to popup
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
