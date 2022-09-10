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

  itemsPerPage: number = 4;
  allPages: number;
  tempList: any = [];

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
        this.tempList = res;
        this.onPageChange(1);
        this.allPages = Math.ceil(this.tempList.length / this.itemsPerPage);
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
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

  onPageChange(page: number): void {
    const startItem = (page - 1) * this.itemsPerPage;
    const endItem = page * this.itemsPerPage;
    this.modelList = this.tempList.slice(startItem, endItem);
  }
}
