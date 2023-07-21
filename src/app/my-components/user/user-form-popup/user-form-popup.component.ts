import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/services/user.service';
import { UserRequest } from 'src/transport/user-request';
import { GenericComponent } from '../../generic.component';
import { RoleDTO } from 'src/transport/helper/role';

@Component({
  selector: 'app-user-form-popup',
  templateUrl: './user-form-popup.component.html'
})
export class UserFormPopupComponent extends GenericComponent implements OnInit, OnDestroy {
  id: any;
  lastUserId: any;
  form: UntypedFormGroup;
  roles: RoleDTO[];

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserFormPopupComponent>,
    private formBuilder: UntypedFormBuilder,
  ) {
    super();
    this.req = new UserRequest();
    this.fetchLastUserId();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.userService.fetchRoles().subscribe((data) => {
      this.roles = data;
    }));

    this.form = this.formBuilder.group({
      userId: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, Validators.required],
      role: [null],
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
              role: [res.role.name, Validators.required],
              status: [res.status],
              locked: [res.locked],
            });
            this.form.controls.userId.disable();
          }
        }));
    }
  }

  fetchLastUserId(): void {
    this.subscriptions.add(this.userService.fetchLastUserId().subscribe((data) => {
      this.lastUserId = data;
      this.form.controls.userId.patchValue(this.lastUserId + 1);
      this.form.controls.userId.disable();
    }));
  }

  onClose() {
    this.dialogRef.close();
  }

  onSaveUser() {
    this.req.$id = this.id;
    this.form.get('userId')?.enable();
    this.req.$userId = this.form.value.userId;
    this.req.$firstName = this.form.value.firstName;
    this.req.$lastName = this.form.value.lastName;
    this.req.$username = this.form.value.username;
    this.req.$email = this.form.value.email;
    this.req.$status = this.form.value.status;
    this.req.$locked = this.form.value.locked;
    this.req.role.name = this.form.value.role;
    if (this.req.role.name === 'ROLE_USER') {
      this.req.role.authorities = ['ROLE_USER'];
    } else if (this.req.role.name === 'ROLE_ADMIN') {
      this.req.role.authorities = ['ROLE_ADMIN', 'ROLE_USER'];
    }
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
