import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { instrumentRoutes } from './my-components/instrument/instrument-routing.module';
import { instrumentSeriesRoutes } from './my-components/instrument-series/instrument-series-routing.module';
import { AuthenticationService } from 'src/services/authentication.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isUserLoggedIn = false;
  instrumentRoutes = instrumentRoutes;
  instrumentSeriesRoutes = instrumentSeriesRoutes;
  title = 'endofusion-client';
  isSidebarOpened: boolean;
  currentRoute: any = 'Home';

  role: string;
  public menuItems: any = [];

  constructor(
    public router: Router, private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentRoute = event;
        if (this.router.url.includes('user')) {
          this.menuItems = null;
        }
        if (this.router.url.includes('instrument')) {
          this.menuItems = this.instrumentRoutes;
        }
        if (this.router.url.includes('instrument-series')) {
          this.menuItems = this.instrumentSeriesRoutes;
        }
      });

    this.authenticationService.changes.subscribe(role => this.role = role);
  }

  onGetIsSideBarOpened(data: boolean) {
    this.isSidebarOpened = data;
  }
}
