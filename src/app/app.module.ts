import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared.module';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeModule } from './my-components/home/home.module';
import { InstrumentModule } from './my-components/instrument/instrument.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InstrumentSeriesModule } from './my-components/instrument-series/instrument-series.module';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { AuthInterceptor } from 'src/interceptor/auth.interceptor';
import { AuthenticationGuard } from 'src/guard/authentication.guard';
import { LoginComponent } from "src/app/my-components/login/login.component";
import { RegisterComponent } from './my-components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule.forRoot([]),
    HomeModule,
    InstrumentModule,
    InstrumentSeriesModule
  ],
  providers: [
    DatePipe, AuthenticationGuard, AuthenticationService, UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
