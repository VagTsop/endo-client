import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { User } from 'src/model/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { instrumentSeriesRoutes } from '../../instrument-series/instrument-series-routing.module';
import { instrumentRoutes } from '../../instrument/instrument-routing.module';
import { UserDetailsPopupComponent } from '../../user/user-details-popup/user-details-popup.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private inactivityTimeout = 3600000; // 1 hour (in milliseconds)
//  private inactivityTimeout = 60000; // 1 minute for test purposes

  private inactivityTimer: any;
  @Output() onSendIsSidebarOpened = new EventEmitter();
  isOpened: boolean = false;
  instrumentRoutes = instrumentRoutes;
  instrumentSeriesRoutes = instrumentSeriesRoutes;
  user: any;
  role: any = '';
  currentRoute: any = 'Home';
  public menuItems: any = [];


  constructor(private dialog: MatDialog, private authenticationService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
    this.authenticationService.changes.subscribe(role => this.role = role);

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
  }

  onUserDetails() {
    this.user = <User>JSON.parse(localStorage.getItem('user') as any);
    const dialogRef = this.dialog.open(UserDetailsPopupComponent, {
      panelClass: 'custom-profile-details-dialog-container',
      data:
      {
        item: this.user
      },
      position: { right: '50px', top: '50px' }
    });
  }
  @HostListener('window:mousemove')
  @HostListener('window:keypress')
  resetInactivityTimer(): void {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      this.authenticationService.logOut();
      this.router.navigate(['/login'])
    }, this.inactivityTimeout);
  }

  onLogout() {
    this.authenticationService.logOut();
    this.router.navigate(['/login'])
  }
}
