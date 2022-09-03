import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InstrumentService } from 'src/services/instrument.service';
import { InstrumentRequest } from 'src/transport/instrument.request';
import { GenericComponent } from '../../generic.component';

@Component({
  selector: 'app-instrument-form-popup',
  templateUrl: './instrument-form-popup.component.html',
  providers: [InstrumentService],
})
export class InstrumentFormPopupComponent extends GenericComponent implements OnInit, OnDestroy {
  id: any;
  instrumentPurchaseDate: Date;
  form: UntypedFormGroup;

  constructor(
    private instrumentService: InstrumentService,
    public dialogRef: MatDialogRef<InstrumentFormPopupComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super();
    this.req = new InstrumentRequest();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      instrumentName: [null, Validators.required],
      instrumentDescription: [null],
      instrumentRef: [null, Validators.required],
      instrumentLot: [null, Validators.required],
      instrumentManufacturer: [null, Validators.required],
      instrumentPurchaseDate: [null, Validators.required],
      instrumentNotes: [null],
    });

    if (this.id) {
      this.subscriptions.add(this.instrumentService.getInstrumentById(this.id)
        .subscribe(res => {
          if (res) {
            this.form = this.formBuilder.group({
              instrumentName: [res.name, Validators.required],
              instrumentDescription: [res.description],
              instrumentRef: [res.instrumentRef, Validators.required],
              instrumentLot: [res.instrumentLot, Validators.required],
              instrumentManufacturer: [res.instrumentManufacturer, Validators.required],
              instrumentPurchaseDate: [res.instrumentPurchaseDate, Validators.required],
              instrumentNotes: [res.instrumentNotes]
            });
          }
        }));
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onSaveInstrument() {
    this.req.$id = this.id;
    this.req.$name = this.form.value.instrumentName;
    this.req.$description = this.form.value.instrumentDescription;
    this.req.$instrumentRef = this.form.value.instrumentRef;
    this.req.$instrumentLot = this.form.value.instrumentLot;
    this.req.$instrumentManufacturer = this.form.value.instrumentManufacturer;
    this.req.$instrumentPurchaseDate = this.form.value.instrumentPurchaseDate;
    this.req.$instrumentNotes = this.form.value.instrumentNotes;
    if (this.id) {
      this.subscriptions.add(this.instrumentService.updateInstrument(this.req).subscribe(
        res => {
          this.dialogRef.close(this.id);
        }
      ));
    } else {
      this.subscriptions.add(this.instrumentService.createInstrument(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
