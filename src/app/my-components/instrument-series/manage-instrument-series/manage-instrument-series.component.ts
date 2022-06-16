import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstrumentSeriesService } from 'src/services/instrument-series.service';
import { GenericComponent } from '../../generic.component';
import { InstrumentSeriesFormPopupComponent } from '../instrument-series-form-popup/instrument-series-form-popup.component';

@Component({
  selector: 'app-manage-instrument-series',
  templateUrl: './manage-instrument-series.component.html',
  providers: [InstrumentSeriesService]
})
export class ManageInstrumentSeriesComponent extends GenericComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private instrumentSeriesService: InstrumentSeriesService
  ) {
    super();
    this.instrumentSeriesReq.$paging.$pageSize = 10;
  }

  ngOnInit() {
    this.onList()
  }

  onList(): void {
    this.subscriptions.add(this.instrumentSeriesService.getInstrumentSeriesList(this.instrumentSeriesReq)
      .subscribe(res => {
        this.modelList = res;
        this.instrumentSeriesReq.$paging.$totalSize = res.totalElements;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  onChangePaging(changePaging: any): void {
    this.instrumentSeriesReq.$paging = changePaging;
    this.onList();
  }

  onForm(id?: any) {
    const dialogRef = this.dialog.open(InstrumentSeriesFormPopupComponent, { disableClose: true, panelClass: 'custom-dialog-container' });
  }
}
