import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { InstrumentSeriesService } from 'src/services/instrument-series.service';
import { GenericComponent } from '../../generic.component';

@Component({
  selector: 'app-instrument-series-form-popup',
  templateUrl: './instrument-series-form-popup.component.html',
  providers: [InstrumentSeriesService]
})
export class InstrumentSeriesFormPopupComponent extends GenericComponent implements OnInit, OnDestroy {
  availableInstrumentsList: any = [];
  selectedInstrumentsList: any = [];

  constructor(private instrumentSeriesService: InstrumentSeriesService,
    private dialogRef: MatDialogRef<InstrumentSeriesFormPopupComponent>,) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.instrumentSeriesService.fetchAvailableInstruments().subscribe((data) => {
      this.availableInstrumentsList = data;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}
