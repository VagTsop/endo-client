import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { User } from '../model/user';
import { CustomHttpRespone } from '../model/custom-http-response';
import { UserRequest } from 'src/transport/user-request';

@Injectable({ providedIn: 'root' })
export class UserService {
  private host = environment.BASE_URL;
  private baseUrl = environment.BASE_URL + '/user'

  constructor(protected http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/add`, formData);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
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

  public deleteUser(username: string): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(`${this.host}/user/delete/${username}`);
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
        params: this.constructParams(request, 'userId,username,firstName,lastName,email,status')
      }
    ).pipe(map((response: any) => {
      return response;
    }));
  }

  public constructParams(
    req: UserRequest,
    searchKeys: any
  ): HttpParams {

    let params: HttpParams = new HttpParams();
    // paging params
    params = params.append('page', (req.$paging.$pageNumber - 1).toString());
    params = params.append('size', req.$paging.$pageSize.toString());
    params = params.append(
      'sort',
      req.$paging.$orderField + ',' + req.$paging.$orderDirection
    );

    // search params
    if (searchKeys) {
      searchKeys.split(',').forEach((key) => {
        if (req[key] != null) {
          params = params.append(key, req[key]);
        }
      });
    }
    return params;
  }
}
