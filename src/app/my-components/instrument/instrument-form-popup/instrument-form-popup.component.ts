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
  public form: UntypedFormGroup;
  public anchorHref: any = null;
  public imagePreview: any = null;

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
      userPhoto: [null],
      fileName: [null],
      fileBytes: [null],
      fileSize: [null],
      fileType: [null],
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
              instrumentNotes: [res.instrumentNotes],
              userPhoto: [res.userPhoto],
              fileName: [null],
              fileBytes: [null],
              fileSize: [null],
              fileType: [null],
            });
            const anchor = document.createElement('a');
            anchor.href = 'data:' + 'image/jpeg' + ';base64,' + res.userPhoto;
            this.anchorHref = anchor.href;
          }
        }));
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0] as File;
    reader.readAsDataURL(file);
    if (file.type !== '' && file.type !== 'application/x-msdownload') {
      reader.onload = () => {
        const res: any = reader.result;
        this.form.controls['fileBytes'].patchValue(res.split(',')[1], { onlySelf: true });
        this.form.controls['fileType'].patchValue(file.type ? file.type : 'application/octet-stream', { onlySelf: true });
        this.form.controls['fileSize'].patchValue(file.size, { onlySelf: true });
        this.form.controls['fileName'].patchValue(file.name, { onlySelf: true });
        this.form.markAsTouched();
        this.form.updateValueAndValidity();
        this.form.controls.userPhoto.patchValue(this.form.value.fileBytes);
        this.form.updateValueAndValidity();
        // imagePreview
        const anchor = document.createElement('a');
        anchor.href = 'data:' + 'image/jpeg' + ';base64,' + this.form.controls.userPhoto.value;
        this.anchorHref = anchor.href;
      };
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
    this.req.$userPhoto = this.form.value.userPhoto;
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
