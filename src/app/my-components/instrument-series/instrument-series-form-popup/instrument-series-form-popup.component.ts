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
  form: UntypedFormGroup;
  id: number;
  lastSelected: number;
  start: number;
  end: number;
  selected1InstrumentSet: Set<number> = new Set();
  selected2InstrumentSet: Set<number> = new Set();
  connectedInstrumentsIds: Array<any> = [];
  filteredConnectedInstrumentsIds: Array<any> = [];
  unconnectedInstrumentsIds: Array<any> = [];
  filteredUnconnectedInstrumentsIds: Array<any> = [];
  isAscUnconnectedInstrumentsIds = false;
  isAscconnectedInstrumentsIds = false;

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
      filteredUnConnectedInstrument: [null],
      filteredConnectedInstrument: [null],
    });
    this.subscriptions.add(this.instrumentSeriesService.fetchAvailableInstruments().subscribe((data) => {
      this.unconnectedInstrumentsIds = data;
      this.filteredUnconnectedInstrumentsIds = data;
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

  onSelectRowInstrument(recordId: number, list: number, index: number, event?: any): void {
    // event ctrl +click
    if (event && event.ctrlKey) {
      this.lastSelected = index;
      if (list === 0) {
        (!this.selected1InstrumentSet.has(recordId))
          ? (this.selected1InstrumentSet.add(recordId))
          : (this.selected1InstrumentSet.delete(recordId));
      } else {
        (!this.selected2InstrumentSet.has(recordId))
          ? (this.selected2InstrumentSet.add(recordId))
          : (this.selected2InstrumentSet.delete(recordId));
      }
    }
    // event shift + click
    else if (event && event.shiftKey) {
      if (index < this.lastSelected) {
        this.start = index;
        this.end = this.lastSelected;
      } else {
        this.start = this.lastSelected;
        this.end = index;
      }
      if (list === 0) {
        for (let k = 0; k <= this.filteredUnconnectedInstrumentsIds.length; k++) {
          if (k <= this.end && k >= this.start) {
            this.selected1InstrumentSet.add(this.filteredUnconnectedInstrumentsIds[k].id);
          }
        }
      } else {
        for (let k = 0; k <= this.filteredConnectedInstrumentsIds.length; k++) {
          if (k <= this.end && k >= this.start) {
            this.selected2InstrumentSet.add(this.filteredConnectedInstrumentsIds[k].id);
          }
        }
      }
    } else {
      // click event
      this.lastSelected = index;
      if (list === 0) {
        if (this.selected1InstrumentSet.size === 0) {
          if (!this.selected1InstrumentSet.has(recordId)) {
            this.selected1InstrumentSet.add(recordId);
          }
        } else {
          // if selected1RoutingSet has one value and click different value
          this.selected1InstrumentSet.clear();
          this.selected1InstrumentSet.add(recordId);
        }
      } else {
        //  for  list 1
        if (this.selected2InstrumentSet.size === 0) {
          if (!this.selected2InstrumentSet.has(recordId)) {
            this.selected2InstrumentSet.add(recordId);
          }
        } else {
          // if selected1RoutingSet has one value and click different value
          this.selected2InstrumentSet.clear();
          this.selected2InstrumentSet.add(recordId);
        }
      }
    }
  }

  onMoveInstrument(direction: string, event?: any) {
    // because onMoveInstrument is used without click event when edit pop up
    // it runs only for user click.
    if (event != null && event.type === 'click') {
      this.form.markAsDirty();
    }
    this.lastSelected = 0;
    this.start = 0;
    this.end = 0;
    const remainingsAddress: Array<any> = [];

    if (direction === 'RIGHT') {
      this.unconnectedInstrumentsIds.forEach(rec => {
        if (this.selected1InstrumentSet.has(rec.id) && !this.recordExists(this.connectedInstrumentsIds, rec.id)) {
          this.connectedInstrumentsIds.push(rec);
          this.selected1InstrumentSet.delete(rec.id);
        } else {
          remainingsAddress.push(rec);
        }
      });
      this.unconnectedInstrumentsIds = remainingsAddress;
      this.filteredUnconnectedInstrumentsIds = remainingsAddress;
      this.filterUnconnectedInstrumentsIds(
        this.form.value.filteredUnConnectedInstrument ? this.form.value.filteredUnConnectedInstrument : '');
      this.filterConnectedInstrumentsIds(
        this.form.value.filteredConnectedInstrument ? this.form.value.filteredConnectedInstrument : '');
    } else {
      this.connectedInstrumentsIds.forEach(rec => {
        if (this.selected2InstrumentSet.has(rec.id) && !this.recordExists(this.unconnectedInstrumentsIds, rec.id)) {
          this.unconnectedInstrumentsIds.push(rec);
          this.selected2InstrumentSet.delete(rec.id);
        } else {
          remainingsAddress.push(rec);
        }
      });
      this.connectedInstrumentsIds = remainingsAddress;
      this.filteredConnectedInstrumentsIds = remainingsAddress;
      this.filterUnconnectedInstrumentsIds(
        this.form.value.filteredUnConnectedInstrument ? this.form.value.filteredUnConnectedInstrument : '');
      this.filterConnectedInstrumentsIds(
        this.form.value.filteredConnectedInstrument ? this.form.value.filteredConnectedInstrument : '');
    }
    this.sort(this.filteredConnectedInstrumentsIds, true);
    this.sort(this.filteredUnconnectedInstrumentsIds, true);
  }

  private recordExists(list: any[], id: number): boolean {
    for (const item of list) {
      if (item.id === id) {
        return true;
      }
    }
    return false;
  }

  sort(list: Array<any>, isAsc: boolean) {
    console.log(list, isAsc)
    if (isAsc) {
      list.sort((one, two) => (one.name < two.name ? -1 : 1));
    } else {
      list.sort((one, two) => (one.name < two.name ? 1 : -1));
    }
  }

  isSelectedInstrument(record: any, list: number): boolean {
    if (list === 0) {
      return this.selected1InstrumentSet.has(record.id);
    } else {
      return this.selected2InstrumentSet.has(record.id);
    }
  }

  filterUnconnectedInstrumentsIds(search: any) {
    this.selected1InstrumentSet.clear();
    this.filteredUnconnectedInstrumentsIds = this.unconnectedInstrumentsIds.filter(
      (item: any) => item.name.toLowerCase().toString().includes(search.toLowerCase().toString())
    );
  }

  filterConnectedInstrumentsIds(search: any) {
    this.selected2InstrumentSet.clear();
    this.filteredConnectedInstrumentsIds = this.connectedInstrumentsIds.filter(
      (item: any) => item.name.toLowerCase().toString().includes(search.toLowerCase().toString())
    );
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
