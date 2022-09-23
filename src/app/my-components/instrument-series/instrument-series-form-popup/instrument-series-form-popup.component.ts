import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { QRCodeElementType } from 'angularx-qrcode';
import { InstrumentSeriesService } from 'src/services/instrument-series.service';
import { InstrumentSeriesRequest } from 'src/transport/instrument-series.request';
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
  elementType = "canvas" as QRCodeElementType

  constructor(private instrumentSeriesService: InstrumentSeriesService,
    private dialogRef: MatDialogRef<InstrumentSeriesFormPopupComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super();
    this.req = new InstrumentSeriesRequest();
  }

  ngOnInit(): void {

    this.subscriptions.add(this.instrumentSeriesService.fetchAvailableInstruments().subscribe((data) => {
      this.sort(data, true);
      this.unconnectedInstrumentsIds = data;
      this.filteredUnconnectedInstrumentsIds = data;
    }));

    this.form = this.formBuilder.group({
      instrumentSeriesCode: [null, Validators.required],
      filteredUnConnectedInstrument: [null],
      filteredConnectedInstrument: [null],
    });

    if (this.id) {
      // Fetch data from service
      this.subscriptions.add(this.instrumentSeriesService.getById(this.id)
        .subscribe(res => {
          if (res) {
            this.form = this.formBuilder.group({
              instrumentSeriesCode: [res[0].instrumentSeriesCode, Validators.required],
              filteredUnConnectedInstrument: [null],
              filteredConnectedInstrument: [null],
            });
            this.hideInputButtonShowQrCode();
            if (res[0].id != null) {
              for (const item of res) {
                this.connectedInstrumentsIds.push(item);
              }
              this.filteredConnectedInstrumentsIds = this.connectedInstrumentsIds;
            }
          }
        }));
    }
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
          // if selected1Instrumentet has one value and click different value
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
          // if selected2nstrumentSet has one value and click different value
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
      this.filteredConnectedInstrumentsIds = this.connectedInstrumentsIds;
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
    // assign the form values to request
    this.req.$instrumentSeriesCode = this.form.value.instrumentSeriesCode;
    for (const item of this.unconnectedInstrumentsIds) {
      this.req.$unconnectedInstrumentsIds.push(item.id);
    }
    for (const item of this.connectedInstrumentsIds) {
      this.req.$connectedInstrumentsIds.push(item.id);
    }
    // call service for create / edit
    if (this.id) {
      this.req.$id = this.id;
      this.subscriptions.add(this.instrumentSeriesService.updateInstrumentSeries(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    } else {
      this.subscriptions.add(this.instrumentSeriesService.createInstrumentSeries(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    }
  }

  onSelect(recordId: number, list: number, tempSelectedOne: Set<number>, tempSelectedTwo: Set<number>) {
    if (list === 0) {
      if (tempSelectedOne.size === 0) {
        if (!tempSelectedOne.has(recordId)) {
          tempSelectedOne.add(recordId);
        }
      } else {
        tempSelectedOne.add(recordId);
      }
    } else {
      //  for  list 1
      if (tempSelectedTwo.size === 0) {
        if (!tempSelectedTwo.has(recordId)) {
          tempSelectedTwo.add(recordId);
        }
      } else {
        tempSelectedTwo.add(recordId);
      }
    }
  }

  saveAsImage(parent: any) {
    let parentElement = null

    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png")
    } else if (this.elementType === "img" || this.elementType === "url") {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = parent.qrcElement.nativeElement.querySelector("img").src
    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.")
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      // name of the file
      link.download = "Qrcode_" + this.form.controls.instrumentSeriesCode.value;
      link.click()
    }
  }

  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)
    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }
}
