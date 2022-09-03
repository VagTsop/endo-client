import { Injectable } from '@angular/core';
import { HttpEvent, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../model/user';
import { CustomHttpRespone } from '../model/custom-http-response';
import { UserRequest } from 'src/transport/user-request';
import { CommonService } from './common.service';

@Injectable({ providedIn: 'root' })
export class UserService extends CommonService {
  private host = environment.BASE_URL;
  private baseUrl = environment.BASE_URL + '/user'

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public resetPassword(email: string): Observable<CustomHttpRespone> {
    return this.http.get<CustomHttpRespone>(`${this.host}/user/resetpassword/${email}`);
  }

  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData,
      {
        reportProgress: true,
        observe: 'events'
      });
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users') as any);
    }
    return null as any;
  }

  public createUserFormDate(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }

  ////////////////////////

  fetchUsernames(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-usernames')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchFirstNames(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-firstnames')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchLastNames(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-lastnames')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  fetchEmails(): Observable<any> {
    return this.http
      .get(this.baseUrl + '/fetch-emails')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getUsersList(request: UserRequest) {
    return this.http.get(
      this.baseUrl + '/get-users-list',
      {
        params: this.constructParams(request, 'userId,username,firstName,lastName,email,status,locked')
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  createUser(request: UserRequest): Observable<any> {
    return this.http.post(
      this.baseUrl + '/create-user', request
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  updateUser(request: UserRequest): Observable<any> {
    return this.http.put(
      this.baseUrl + '/update-user?id=' + request.$id,
      request)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(
      this.baseUrl + '/get-user-by-id',
      {
        params: new HttpParams().set('id', id.toString())
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  deleteUser(id: number): Observable<any> {
    return this.http.post(
      this.baseUrl + '/delete-user', id
    ).pipe(map((response: any) => {
      return response;
    }));
  }
}
