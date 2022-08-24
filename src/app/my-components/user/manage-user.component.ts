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

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) {
    super()
  }

  ngOnInit(): void {
    this.subscriptions.add(this.userService.fetchUsers().subscribe((data) => {
      this.usernameList = data;
      this.filteredUsernameList = data;
    }));
  }

  onList(): void {
    this.subscriptions.add(this.userService.getUsersList(this.userReq)
      .subscribe(res => {
        this.modelList = res.content;
        this.userReq.$paging.$totalSize = res.totalElements;
      }));
  }

  onSearch() {
    this.onList();
  }

  onReset() {
    this.filteredUsernameList = this.usernameList;
    this.userReq = new UserRequest();
    this.userReq.$paging.$pageSize = 10;
    this.userReq.$paging.$orderField = Field.USERNAME;
    this.userReq.$paging.$orderDirection = 'DESC';
    this.onList();
  }

  filterUsernameList(search: any) {
    this.filteredUsernameList = this.usernameList.filter((item: any) => item.username.toLowerCase().includes(search.toLowerCase().toString()));
  }

  onChangePaging(changePaging: any): void {
    this.userReq.$paging = changePaging;
    this.onList();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
