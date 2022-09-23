import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { PagingComponent } from "./my-components/paging/paging.component";
import { SortingComponent } from "./my-components/sorting/sorting.component";
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatNativeDateModule } from "@angular/material/core";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { ScannerComponent } from "./my-components/scanner/scanner.component";
import { HeaderComponent } from "./my-components/layout/header/header.component";
import { RouterModule } from "@angular/router";
import { MatDialogModule } from "@angular/material/dialog";
import { ControlMessageComponent } from './validation/control-message/control-message.component';
import { NotificationService } from "src/services/notification.service";
import { ToastrModule } from "ngx-toastr";
import { VerificationPopupComponent } from "./my-components/verification-popup/verification-popup.component";
import { DropdownPagingComponent } from "./my-components/paging/dropdown-paging/dropdown-paging.component";

const MATERIAL_MODULES = [
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule,
  MatDialogModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  NgxMatSelectSearchModule,
  MatToolbarModule
];

@NgModule({

  declarations: [
    PagingComponent,
    DropdownPagingComponent,
    SortingComponent,
    ScannerComponent,
    HeaderComponent,
    ControlMessageComponent,
    VerificationPopupComponent
  ],
  imports: [
    FlexLayoutModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MATERIAL_MODULES,
    ZXingScannerModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      newestOnTop: false,
      maxOpened: 10,
      progressBar: true
    }),
  ],
  exports: [
    RouterModule,
    FormsModule,
    FlexLayoutModule,
    MATERIAL_MODULES,
    ReactiveFormsModule,
    CommonModule,
    PagingComponent,
    DropdownPagingComponent,
    SortingComponent,
    ScannerComponent,
    ControlMessageComponent,
    //  ZXingScannerModule,
    HeaderComponent
  ],
  providers: [
    NotificationService
  ],
})
export class SharedModule {
}
