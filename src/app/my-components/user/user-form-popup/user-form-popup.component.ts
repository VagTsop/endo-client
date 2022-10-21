import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { UserRequest } from 'src/transport/user-request';
import { GenericComponent } from '../../generic.component';

@Component({
  selector: 'app-user-form-popup',
  templateUrl: './user-form-popup.component.html'
})
export class UserFormPopupComponent extends GenericComponent implements OnInit, OnDestroy {
  id: any;
  form: UntypedFormGroup;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormPopupComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super();
    this.req = new UserRequest();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userId: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, Validators.required],
      status: [false],
      locked: [false]
    });

    if (this.id) {
      this.subscriptions.add(this.userService.getUserById(this.id)
        .subscribe(res => {
          if (res) {
            this.form = this.formBuilder.group({
              userId: [res.userId, Validators.required],
              firstName: [res.firstName, Validators.required],
              lastName: [res.lastName, Validators.required],
              username: [res.username, Validators.required],
              email: [res.email, Validators.required],
              status: [res.status],
              locked: [res.locked],
            });
          }
        }));
    }
  }

  onClose() {
    this.dialogRef.close();
  }
  onSaveUser() {
    this.req.$id = this.id;
    this.req.$userId = this.form.value.userId;
    this.req.$firstName = this.form.value.firstName;
    this.req.$lastName = this.form.value.lastName;
    this.req.$username = this.form.value.username;
    this.req.$userId = this.form.value.userId;
    this.req.$email = this.form.value.email;
    this.req.$status = this.form.value.status;
    this.req.$locked = this.form.value.locked;
    if (this.id) {
      this.subscriptions.add(this.userService.updateUser(this.req).subscribe(
        res => {
          this.dialogRef.close(this.id);
        }
      ));
    } else {
      this.subscriptions.add(this.userService.createUser(this.req).subscribe(
        res => {
          this.dialogRef.close(res);
        }
      ));
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
