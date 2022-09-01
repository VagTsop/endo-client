import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { InstrumentService } from 'src/services/instrument.service';
import { Field } from 'src/transport/helper/table-fields.helper';
import { InstrumentRequest } from 'src/transport/instrument.request';
import { GenericComponent } from '../generic.component';
import { MatDialog } from '@angular/material/dialog';
import { InstrumentFormPopupComponent } from './instrument-form-popup/instrument-form-popup.component';
import { NotificationService } from 'src/services/notification.service';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';


@Component({
  selector: 'app-instrument-table',
  templateUrl: './manage-instrument.component.html',
  providers: [InstrumentService]
})
export class ManageInstrumentComponent extends GenericComponent implements OnInit, OnDestroy {
  filterOpened = false;
  instrumentList: any = [];
  filteredInstrumentList: any = [];
  instrumentSeriesCodesList: any = [];
  filteredInstrumentSeriesCodesList: any = [];
  dateFrom: Date;
  dateTo: Date;
  maxDate: Date;
  minDateFrom: Date;

  constructor(
    private dialog: MatDialog,
    private instrumentService: InstrumentService,
    public datePipe: DatePipe,
    private notificationService: NotificationService
  ) {
    super();
    this.onReset();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.instrumentService.fetchInstruments().subscribe((data) => {
      this.instrumentList = data;
      this.filteredInstrumentList = data;
    }));
    this.subscriptions.add(this.instrumentService.fetchInstrumentsSeriesCodes().subscribe((data) => {
      this.instrumentSeriesCodesList = data;
      this.filteredInstrumentSeriesCodesList = data;
    }));
    this.onList()
  }

  onList(): void {
    this.subscriptions.add(this.instrumentService.getInstrumentsList(this.req)
      .subscribe(res => {
        this.modelList = res.content;
        this.req.$paging.$totalSize = res.totalElements;
      }));
  }

  onSearch() {
    this.req.$purchaseDateFrom = this.datePipe.transform(this.dateFrom, 'yyyy-MM-dd') as string;
    this.req.$purchaseDateTo = this.datePipe.transform(this.dateTo, 'yyyy-MM-dd') as string;
    this.onList();
  }

  onReset() {
    this.filteredInstrumentList = this.instrumentList;
    this.filteredInstrumentSeriesCodesList = this.instrumentSeriesCodesList
    this.req = new InstrumentRequest();
    this.req.$paging.$pageSize = 10;
    this.req.$paging.$orderField = Field.INSTRUMENT_NAME;
    this.req.$paging.$orderDirection = 'DESC';
    this.onList();
  }

  onDatePicker(event: any) {
    this.dateTo = null as any;
    if (event != null && this.dateFrom === null) {
      const tempDay = new Date();
      tempDay.setFullYear(event.getFullYear());
      tempDay.setMonth(event.getMonth());
      tempDay.setDate(event.getDate());
      this.minDateFrom = new Date(
        tempDay.setMonth(tempDay.getMonth() - 1)
      );
    }
  }
  onForm(id?: any) {
    const dialogRef = this.dialog.open(InstrumentFormPopupComponent, { disableClose: true, panelClass: 'custom-form-dialog-container' },);
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.instrumentService.fetchInstruments().subscribe((data) => {
          this.instrumentList = data;
          this.filteredInstrumentList = data;
        }));
        this.onList();
        this.notificationService.showNotification(
          {
            title: 'Save',
            type: 'SUCCESS',
            message: 'Your instrument has been saved',
          });
      }
    });
  }

  onSelectRow(item: any): void {
    this.selectedRow = item;
  }

  onDeleteInstrument(id: number) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      panelClass: 'custom-verification-dialog-container',
      data:
      {
        item: "Are you sure you want to delete" +
          ' "' + this.selectedRow.name + '" ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.instrumentService.deleteInstrument(id)
          .subscribe(res => {
            if (res) {
              this.subscriptions.add(this.instrumentService.fetchInstruments().subscribe((data) => {
                this.instrumentList = data;
                this.filteredInstrumentList = data;
              }));
              this.onList();
              this.notificationService.showNotification(
                {
                  title: 'Delete',
                  type: 'SUCCESS',
                  message: 'Your instrument has been deleted',
                });
            }
          }));
      }
    });
  }

  filterInstrumentList(search: any) {
    this.filteredInstrumentList = this.instrumentList.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase().toString()));
  }


  filterInstrumentSeriesCodesList(search: any) {
    this.filteredInstrumentSeriesCodesList = this.instrumentSeriesCodesList.filter((item: any) => String(item.instrumentSeriesCode).toLowerCase().includes(search.toLowerCase()))
  }

  onChangePaging(changePaging: any): void {
    this.req.$paging = changePaging;
    this.onList();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
