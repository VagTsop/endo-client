import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { instrumentRoutes } from './my-components/instrument/instrument-routing.module';
import { instrumentSeriesRoutes } from './my-components/instrument-series/instrument-series-routing.module';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements DoCheck {
  isUserLoggedIn = false;
  instrumentRoutes = instrumentRoutes;
  instrumentSeriesRoutes = instrumentSeriesRoutes;
  title = 'endofusion-client';
  isSidebarOpened: boolean;
  public menuItems: any = [];

  constructor(
    public router: Router,
  ) { }

  ngDoCheck() {
    this.getMenuItems();
  }

  getMenuItems(): Array<any> {
    if (this.router.url.includes('user')) {
      this.menuItems = null;
    }
    if (this.router.url.includes('instrument')) {
      this.menuItems = this.instrumentRoutes;
    }
    if (this.router.url.includes('instrument-series')) {
      this.menuItems = this.instrumentSeriesRoutes;
    }
    return this.menuItems;
  }

  onGetIsSideBarOpened(data: boolean) {
    this.isSidebarOpened = data;
  }
}
