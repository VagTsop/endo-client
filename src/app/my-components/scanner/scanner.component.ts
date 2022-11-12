import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { GenericComponent } from '../generic.component';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
})
export class ScannerComponent extends GenericComponent implements AfterViewInit,  OnDestroy {
  @Output() qrCodeScanned = new EventEmitter<string>();
  scannerEnabled: boolean = true;
  information: string = "No code information detected. Zoom in QR code to scan.";

  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasCameras = false;
  hasPermission: boolean;
  qrResultString: string;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }
  ngAfterViewInit() {
    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;
      console.log('Devices: ', devices);
      this.availableDevices = devices;
      this.setDeviceDefaultCamera();
    });
  }
  onSendQrCode(code: any) {
    this.qrCodeScanned.emit(code);
  }
  public scanSuccessHandler(code: any) {
    console.log('scanned')
    this.scannerEnabled = false;
    this.information = "Wait retrieving information... ";
    this.onSendQrCode(code);
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No code information detected. Zoom in a QR code to scan.";
  }

  onDeviceSelectChange(selectedValue) {
    console.log('Selection changed: ', selectedValue);
    this.scanner.device = selectedValue;
  }

  setDeviceDefaultCamera() {
    for (let index = 0; index < this.availableDevices.length; index++) {
      if (this.availableDevices[index].label.toLowerCase().includes('front') || this.availableDevices[index].label.toLowerCase().includes('rear')) {
        this.scanner.device = this.availableDevices[index];
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
