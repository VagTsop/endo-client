import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from 'src/model/user';
import { AuthenticationService } from '../services/authentication.service';
import { NotificationService } from '../services/notification.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router,
    private notificationService: NotificationService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authenticationService.isUserLoggedIn()) {
      const authUser = <User>JSON.parse(localStorage.getItem('user') as any)
      if (!next.data.role.includes(authUser.role)) {
        this.router.navigate(['/public']);
        this.authenticationService.logOut();
        this.notificationService.showNotification(
          { title: 'Error', type: 'ERROR', message: 'You dont have permission to access this page', });
        return false;
      }
    }
    return true;
  }
}
