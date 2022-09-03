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
  url: string | null;


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
      locked: [false],
      profileImage: [null],
      profileImageName: [null],
      profileImageBytes: [null],
      profileImageSize: [null],
      profileImageType: [null],
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
              profileImage: [res.profileImage],
              profileImageName: [null],
              profileImageBytes: [null],
              profileImageSize: [null],
              profileImageType: [null]
            });
            this.url =
              'data:' +
              'image/jpeg' +
              ';base64,' +
              this.form.controls.profileImage.value;
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
    this.req.$profileImage = this.form.value.profileImage;
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

  onSelectFile(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0] as File;
    reader.readAsDataURL(file);
    if (file.type !== '' && file.type !== 'application/x-msdownload') {
      reader.onload = () => {
        const res: any = reader.result;
        this.form.controls['profileImageBytes'].patchValue(res.split(',')[1], {
          onlySelf: true,
        });
        this.form.controls['profileImageType'].patchValue(
          file.type ? file.type : 'application/octet-stream',
          { onlySelf: true }
        );
        this.form.controls['profileImageSize'].patchValue(file.size, {
          onlySelf: true,
        });
        this.form.controls['profileImageName'].patchValue(file.name, {
          onlySelf: true,
        });
        this.form.markAsTouched();
        this.form.updateValueAndValidity();
        this.form.controls.profileImage.patchValue(
          this.form.value.profileImageBytes
        );
        this.form.updateValueAndValidity();
        // imagePreview
        this.url =
          'data:' +
          'image/jpeg' +
          ';base64,' +
          this.form.controls.profileImage.value;
      };
    }
  }

  public remove() {
    this.url = null;
    this.form.controls['profileImage'].patchValue(null);
    this.form.controls['profileImageName'].patchValue(null);
    this.form.controls['profileImageBytes'].patchValue(null);
    this.form.controls['profileImageType'].patchValue(null);
    this.form.controls['profileImageSize'].patchValue(null);
  }
}
