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

  showInput: boolean = true;
  showGenerateQrButton = true;
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

  hideInputButtonShowQrCode() {
    this.showInput = false;
    this.showGenerateQrButton = false;
    this.showQrCode = true;
  }

  hideQrCodeShowInputButton() {
    this.showQrCode = false;
    this.showInput = true;
    this.showGenerateQrButton = true;
    this.form.controls.instrumentSeriesCode.patchValue('');
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
