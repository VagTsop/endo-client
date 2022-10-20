import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { InstrumentSeriesScannerComponent } from "./instrument-series-scanner/instrument-series-scanner.component";
import { ManageInstrumentSeriesComponent } from "./manage-instrument-series/manage-instrument-series.component";

export const instrumentSeriesRoutes: Routes = [
  {
    path: 'manage-instrument-series', canActivate: [AuthenticationGuard], component: ManageInstrumentSeriesComponent, data: {
      label: 'Manage Instrument Series',
      role: 'ROLE_ADMIN'
    },
  },
  {
    path: 'instrument-series-scanner', canActivate: [AuthenticationGuard], component: InstrumentSeriesScannerComponent, data: {
      label: 'Scan Instrument Series',
      role: 'ROLE_ADMIN,ROLE_USER',
    },
  }
];
@NgModule({
  imports: [RouterModule.forChild(instrumentSeriesRoutes)],
  exports: [RouterModule]
})
export class InstrumentSeriesScannerRoutingModule {

}
