import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from 'src/app/shared.module'
import { InstrumentRoutingModule } from "./instrument-routing.module";
import { ManageInstrumentComponent } from "./manage-instrument.component";
import { InstrumentFormPopupComponent } from './instrument-form-popup/instrument-form-popup.component';


@NgModule({
  declarations: [
    ManageInstrumentComponent,
    InstrumentFormPopupComponent
  ],
  imports: [
    CommonModule,
    InstrumentRoutingModule,
    SharedModule,
  ],
})
export class InstrumentModule { }

