import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { InstrumentSeriesScannerRoutingModule } from "./instrument-series-routing.module";
import { InstrumentSeriesScannerComponent } from "./instrument-series-scanner/instrument-series-scanner.component";
import { ManageInstrumentSeriesComponent } from './manage-instrument-series/manage-instrument-series.component';
import { InstrumentSeriesFormPopupComponent } from './instrument-series-form-popup/instrument-series-form-popup.component';

@NgModule({
  declarations: [
    ManageInstrumentSeriesComponent,
    InstrumentSeriesScannerComponent,
    InstrumentSeriesFormPopupComponent,
   ],
  imports: [
    CommonModule,
    InstrumentSeriesScannerRoutingModule,
    SharedModule,
  ],
})
export class InstrumentSeriesModule { }
