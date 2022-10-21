import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map, Observable } from 'rxjs';
import { UserRequest } from 'src/transport/user-request';
import { CommonService } from './common.service';

@Injectable({ providedIn: 'root' })
export class UserService extends CommonService {
  
  private baseUrl = environment.BASE_URL + '/user'

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
