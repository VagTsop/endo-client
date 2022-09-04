import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-user-details-popup',
  templateUrl: './user-details-popup.component.html'
})
export class UserDetailsPopupComponent implements OnInit {
  user: any = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDetailsPopupComponent>,
  ) {
  }

  ngOnInit(): void {
    this.user = this.data.item;
    console.log(this.user)
  }

  onClose() {
    this.dialogRef.close();
  }
}
