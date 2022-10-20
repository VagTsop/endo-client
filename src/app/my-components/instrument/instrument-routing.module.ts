import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "src/guard/authentication.guard";
import { ManageInstrumentComponent } from "./manage-instrument.component";

export const instrumentRoutes: Routes = [
  {
    path: 'manage-instrument', canActivate: [AuthenticationGuard], component: ManageInstrumentComponent, data: {
      label: 'Manage Instruments',
      role: 'ROLE_ADMIN'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(instrumentRoutes)],
  exports: [RouterModule]
})
export class InstrumentRoutingModule { }
