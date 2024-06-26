import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InstrumentSeriesScannerComponent } from "./instrument-series-scanner/instrument-series-scanner.component";
import { ManageInstrumentSeriesComponent } from "./manage-instrument-series/manage-instrument-series.component";

export const instrumentSeriesRoutes: Routes = [
  {
    path: 'manage-instrument-series', component: ManageInstrumentSeriesComponent, data: {
      label: 'Manage Instrument Series'
    },
  },
  {
    path: 'instrument-series-scanner', component: InstrumentSeriesScannerComponent, data: {
      label: 'Scan Instrument Series'
    },
  }
];
@NgModule({
  imports: [RouterModule.forChild(instrumentSeriesRoutes)],
  exports: [RouterModule]
})
export class InstrumentSeriesScannerRoutingModule {

}
