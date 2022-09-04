import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
  form: UntypedFormGroup;
  showQrCode: boolean = false;

  constructor(private instrumentSeriesService: InstrumentSeriesService,
    private dialogRef: MatDialogRef<InstrumentSeriesFormPopupComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      instrumentSeriesCode: [null, Validators.required],

    });
    this.subscriptions.add(this.instrumentSeriesService.fetchAvailableInstruments().subscribe((data) => {
      this.availableInstrumentsList = data;
    }));
  }


  onSaveInstrumentSeries() {
    console.log(this.form.value.instrumentSeriesCode)
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}
