import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { User } from 'src/model/user';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserDetailsPopupComponent } from '../../user/user-details-popup/user-details-popup.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output() onSendIsSidebarOpened = new EventEmitter();
  isOpened: boolean = false;
  user: any;
  role: any = '';

  constructor(private dialog: MatDialog, private authenticationService: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit(): void {
      this.authenticationService.changes.subscribe(role => this.role = role);
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

  onLogout() {
    this.authenticationService.logOut();
    this.router.navigate(['/login'])
  }
}
