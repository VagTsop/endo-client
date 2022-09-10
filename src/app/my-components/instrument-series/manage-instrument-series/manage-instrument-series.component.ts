import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InstrumentSeriesService } from 'src/services/instrument-series.service';
import { NotificationService } from 'src/services/notification.service';
import { InstrumentSeriesRequest } from 'src/transport/instrument-series.request';
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
    private instrumentSeriesService: InstrumentSeriesService,
    private notificationService: NotificationService
  ) {
    super();
    this.req = new InstrumentSeriesRequest();
    this.req.$paging.$pageSize = 10;
  }

  ngOnInit() {
    this.onList()
  }

  onList(): void {
    this.subscriptions.add(this.instrumentSeriesService.getInstrumentSeriesList(this.req)
      .subscribe(res => {
        this.modelList = res;
        this.req.$paging.$totalSize = res.totalElements;
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onChangePaging(changePaging: any): void {
    this.req.$paging = changePaging;
    this.onList();
  }

  onForm(id?: any) {
    const dialogRef = this.dialog.open(InstrumentSeriesFormPopupComponent, { disableClose: true, maxHeight: '100vh', width: '80vw', panelClass: 'custom-instrument-series-form-dialog-container' });
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onList();
        this.notificationService.showNotification(
          {
            title: 'Save',
            type: 'SUCCESS',
            message: 'Your instrument series has been saved',
          });
      }
    });
  }
}
