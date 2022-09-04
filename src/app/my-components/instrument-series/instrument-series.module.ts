import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { InstrumentSeriesScannerRoutingModule } from "./instrument-series-routing.module";
import { InstrumentSeriesScannerComponent } from "./instrument-series-scanner/instrument-series-scanner.component";
import { ManageInstrumentSeriesComponent } from './manage-instrument-series/manage-instrument-series.component';
import { InstrumentSeriesFormPopupComponent } from './instrument-series-form-popup/instrument-series-form-popup.component';
import { InstrumentSeriesDetailsPopupComponent } from "./instrument-series-detaills-popup/instrument-series-details-popup.component";
import { QRCodeModule } from "angularx-qrcode";

@NgModule({
  declarations: [
    ManageInstrumentSeriesComponent,
    InstrumentSeriesScannerComponent,
    InstrumentSeriesFormPopupComponent,
    InstrumentSeriesDetailsPopupComponent
   ],
  imports: [
    CommonModule,
    InstrumentSeriesScannerRoutingModule,
    SharedModule,
    QRCodeModule
  ],
})
export class InstrumentSeriesModule { }
