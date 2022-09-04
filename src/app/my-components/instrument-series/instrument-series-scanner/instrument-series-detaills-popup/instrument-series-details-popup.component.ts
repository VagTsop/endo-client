import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-instrument-series-details-popup',
  templateUrl: './instrument-series-details-popup.component.html',
})
export class InstrumentSeriesDetailsPopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InstrumentSeriesDetailsPopupComponent>) { }

  ngOnInit(): void {
    console.log(this.data.item)
  }

  onClose() {
    this.dialogRef.close();
  }
}
