import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { GenericComponent } from '../generic.component';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
})
export class ScannerComponent extends GenericComponent implements OnInit, OnDestroy {
  @Output() qrCodeScanned = new EventEmitter<string>();
  scannerEnabled: boolean = true;
  information: string = "No code information detected. Zoom in QR code to scan.";
  constructor(private cd: ChangeDetectorRef) {
    super();
  }
  ngOnInit() {
  }
  //
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
