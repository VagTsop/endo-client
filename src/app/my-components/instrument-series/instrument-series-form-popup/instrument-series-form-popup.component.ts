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

  id: number;
  lastSelected: number;
  start: number;
  end: number;
  selected1AddressSet: Set<number> = new Set();
  selected2AddressSet: Set<number> = new Set();
  connectedAddressesIds: Array<any> = [];
  filteredConnectedAddressesIds: Array<any> = [];
  unconnectedAddressesIds: Array<any> = [];
  filteredUnconnectedAddressesIds: Array<any> = [];
  isAscUnconnectedGroupIds = false;
  isAscConnectedGroupIds = false;
  isAscUnconnectedAddressesIds = false;
  isAscConnectedAddressesIds = false;

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
      filteredUnConnectedAddress: [null],
      filteredConnectedAddress: [null],
    });
    this.subscriptions.add(this.instrumentSeriesService.fetchAvailableInstruments().subscribe((data) => {
      this.unconnectedAddressesIds = data;
      this.filteredUnconnectedAddressesIds = data;
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

  onSelectRowAddress(recordId: number, list: number, index: number, event?: any): void {
    // event ctrl +click
    if (event && event.ctrlKey) {
      this.lastSelected = index;
      if (list === 0) {
        (!this.selected1AddressSet.has(recordId))
          ? (this.selected1AddressSet.add(recordId))
          : (this.selected1AddressSet.delete(recordId));
      } else {
        (!this.selected2AddressSet.has(recordId))
          ? (this.selected2AddressSet.add(recordId))
          : (this.selected2AddressSet.delete(recordId));
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
        for (let k = 0; k <= this.filteredUnconnectedAddressesIds.length; k++) {
          if (k <= this.end && k >= this.start) {
            this.selected1AddressSet.add(this.filteredUnconnectedAddressesIds[k].id);
          }
        }
      } else {
        for (let k = 0; k <= this.filteredConnectedAddressesIds.length; k++) {
          if (k <= this.end && k >= this.start) {
            this.selected2AddressSet.add(this.filteredConnectedAddressesIds[k].id);
          }
        }
      }
    } else {
      // click event
      this.lastSelected = index;
      if (list === 0) {
        if (this.selected1AddressSet.size === 0) {
          if (!this.selected1AddressSet.has(recordId)) {
            this.selected1AddressSet.add(recordId);
          }
        } else {
          // if selected1RoutingSet has one value and click different value
          this.selected1AddressSet.clear();
          this.selected1AddressSet.add(recordId);
        }
      } else {
        //  for  list 1
        if (this.selected2AddressSet.size === 0) {
          if (!this.selected2AddressSet.has(recordId)) {
            this.selected2AddressSet.add(recordId);
          }
        } else {
          // if selected1RoutingSet has one value and click different value
          this.selected2AddressSet.clear();
          this.selected2AddressSet.add(recordId);
        }
      }
    }
  }

  onMoveAddress(direction: string, event?: any) {
    // because onMoveAddress is used without click event when edit pop up
    // it runs only for user click.
    if (event != null && event.type === 'click') {
      this.form.markAsDirty();
    }
    this.lastSelected = 0;
    this.start = 0;
    this.end = 0;
    const remainingsAddress: Array<any> = [];

    if (direction === 'RIGHT') {
      this.unconnectedAddressesIds.forEach(rec => {
        if (this.selected1AddressSet.has(rec.id) && !this.recordExists(this.connectedAddressesIds, rec.id)) {
          this.connectedAddressesIds.push(rec);
          this.selected1AddressSet.delete(rec.id);
        } else {
          remainingsAddress.push(rec);
        }
      });
      this.unconnectedAddressesIds = remainingsAddress;
      this.filteredUnconnectedAddressesIds = remainingsAddress;
      this.filterUnconnectedAddressesIds(
        this.form.value.filteredUnconnectedAddress ? this.form.value.filteredUnconnectedAddress : '');
      this.filterConnectedAddressesIds(
        this.form.value.filteredConnectedAddress ? this.form.value.filteredConnectedAddress : '');
    } else {
      this.connectedAddressesIds.forEach(rec => {
        if (this.selected2AddressSet.has(rec.id) && !this.recordExists(this.unconnectedAddressesIds, rec.id)) {
          this.unconnectedAddressesIds.push(rec);
          this.selected2AddressSet.delete(rec.id);
        } else {
          remainingsAddress.push(rec);
        }
      });
      this.connectedAddressesIds = remainingsAddress;
      this.filteredConnectedAddressesIds = remainingsAddress;
      this.filterUnconnectedAddressesIds(
        this.form.value.filteredUnconnectedAddress ? this.form.value.filteredUnconnectedAddress : '');
      this.filterConnectedAddressesIds(
        this.form.value.filteredConnectedAddress ? this.form.value.filteredConnectedAddress : '');
    }
    this.sort(this.filteredConnectedAddressesIds, true);
    this.sort(this.filteredUnconnectedAddressesIds, true);
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

  isSelectedAddress(record: any, list: number): boolean {
    if (list === 0) {
      return this.selected1AddressSet.has(record.id);
    } else {
      return this.selected2AddressSet.has(record.id);
    }
  }

  filterUnconnectedAddressesIds(search: any) {
    this.selected1AddressSet.clear();
    this.filteredUnconnectedAddressesIds = this.unconnectedAddressesIds.filter(
      (item: any) => item.name.toLowerCase().toString().includes(search.toLowerCase().toString())
    );
  }

  filterConnectedAddressesIds(search: any) {
    this.selected2AddressSet.clear();
    this.filteredConnectedAddressesIds = this.connectedAddressesIds.filter(
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
