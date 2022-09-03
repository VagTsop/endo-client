import { Component } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  role: any;
  constructor(private authenticationService: AuthenticationService,) { }
  ngOnInit(): void {
    this.getUserRole();
  }

  getUserRole() {
    this.role = this.authenticationService.getUserFromLocalCache().role
    console.log(this.role);

  }
}
