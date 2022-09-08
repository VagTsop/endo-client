import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { FileUploadStatus } from '../../../model/file-upload.status';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { NotificationService } from 'src/services/notification.service';
import { GenericComponent } from '../generic.component';
import { Field } from 'src/transport/helper/table-fields.helper';
import { UserRequest } from 'src/transport/user-request';
import { UserFormPopupComponent } from './user-form-popup/user-form-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { VerificationPopupComponent } from '../verification-popup/verification-popup.component';

@Component({
  selector: 'app-user',
  templateUrl: './manage-user.component.html',
})
export class ManageUserComponent extends GenericComponent implements OnInit, OnDestroy {
  private titleSubject = new BehaviorSubject<string>('Users');
  titleAction$ = this.titleSubject.asObservable();
  users: User[];
  user: User;
  refreshing: boolean;
  selectedUser: User;
  fileName: string;
  profileImage: File;
  editUser = new User();
  fileStatus = new FileUploadStatus();

  // my fields
  filterOpened = false;

  usernameList: any = [];
  filteredUsernameList: any = [];

  firstNameList: any = [];
  filteredFirstNameList: any = [];

  lastNameList: any = [];
  filteredLastNameList: any = [];

  emailList: any = [];
  filteredEmailList: any = [];


  constructor(private dialog: MatDialog,
    private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) {
    super()
    this.onReset();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.userService.fetchFirstNames().subscribe((data) => {
      this.firstNameList = data;
      this.filteredFirstNameList = data;
    }));
    this.subscriptions.add(this.userService.fetchLastNames().subscribe((data) => {
      this.lastNameList = data;
      this.filteredLastNameList = data;
    }));
    this.subscriptions.add(this.userService.fetchUsernames().subscribe((data) => {
      this.usernameList = data;
      this.filteredUsernameList = data;
    }));
    this.subscriptions.add(this.userService.fetchEmails().subscribe((data) => {
      this.emailList = data;
      this.filteredEmailList = data;
    }));
    this.onList();
  }

  onList(): void {
    this.subscriptions.add(this.userService.getUsersList(this.req)
      .subscribe(res => {
        this.modelList = res.content;
        this.req.$paging.$totalSize = res.totalElements;
      }));
  }

  onSearch() {
    this.onList();
  }

  onReset() {
    this.filteredUsernameList = this.usernameList;
    this.filteredFirstNameList = this.firstNameList;
    this.filteredLastNameList = this.lastNameList;
    this.filteredEmailList = this.emailList;
    this.req = new UserRequest();
    this.req.$paging.$pageSize = 10;
    this.req.$paging.$orderField = Field.USERNAME;
    this.req.$paging.$orderDirection = 'DESC';
    this.onList();
  }

  onForm(id?: any) {
    const dialogRef = this.dialog.open(UserFormPopupComponent, { disableClose: true, panelClass: 'custom-form-dialog-container' },);
    dialogRef.componentInstance.id = id;
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.userService.fetchFirstNames().subscribe((data) => {
          this.firstNameList = data;
          this.filteredFirstNameList = data;
        }));
        this.subscriptions.add(this.userService.fetchLastNames().subscribe((data) => {
          this.lastNameList = data;
          this.filteredLastNameList = data;
        }));
        this.subscriptions.add(this.userService.fetchUsernames().subscribe((data) => {
          this.usernameList = data;
          this.filteredUsernameList = data;
        }));
        this.subscriptions.add(this.userService.fetchEmails().subscribe((data) => {
          this.emailList = data;
          this.filteredEmailList = data;
        }));
        this.onList();
        this.notificationService.showNotification(
          {
            title: 'Save',
            type: 'SUCCESS',
            message: 'User has been saved',
          });
      }
    });
  }

  onSelectRow(item: any): void {
    this.selectedRow = item;
  }

  onDeleteUser(id: number) {
    const dialogRef = this.dialog.open(VerificationPopupComponent, {
      panelClass: 'custom-verification-dialog-container',
      data:
      {
        item: "Are you sure you want to delete " +
          ' "' + this.selectedRow.username + '" ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions.add(this.userService.deleteUser(id)
          .subscribe(res => {
            if (res) {
              this.subscriptions.add(this.userService.fetchFirstNames().subscribe((data) => {
                this.firstNameList = data;
                this.filteredFirstNameList = data;
              }));
              this.subscriptions.add(this.userService.fetchLastNames().subscribe((data) => {
                this.lastNameList = data;
                this.filteredLastNameList = data;
              }));
              this.subscriptions.add(this.userService.fetchUsernames().subscribe((data) => {
                this.usernameList = data;
                this.filteredUsernameList = data;
              }));
              this.subscriptions.add(this.userService.fetchEmails().subscribe((data) => {
                this.emailList = data;
                this.filteredEmailList = data;
              }));
              this.onList();
              this.notificationService.showNotification(
                {
                  title: 'Delete',
                  type: 'SUCCESS',
                  message: 'User has been deleted',
                });
            }
          }));
      }
    });
  }

  filterFirstNameList(search: any) {
    this.filteredFirstNameList = this.firstNameList.filter((item: any) => item.firstName.toLowerCase().includes(search.toLowerCase().toString()));
  }

  filterLastNameList(search: any) {
    this.filteredLastNameList = this.lastNameList.filter((item: any) => item.lastName.toLowerCase().includes(search.toLowerCase().toString()));
  }

  filterUsernameList(search: any) {
    this.filteredUsernameList = this.usernameList.filter((item: any) => item.username.toLowerCase().includes(search.toLowerCase().toString()));
  }

  filterEmailList(search: any) {
    this.filteredEmailList = this.emailList.filter((item: any) => item.email.toLowerCase().includes(search.toLowerCase().toString()));
  }

  onChangePaging(changePaging: any): void {
    this.req.$paging = changePaging;
    this.onList();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
