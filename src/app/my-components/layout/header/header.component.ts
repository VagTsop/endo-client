import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output() onSendIsSidebarOpened = new EventEmitter();
  isOpened: boolean = false;
  constructor(
    public router: Router
  ) { }
}
