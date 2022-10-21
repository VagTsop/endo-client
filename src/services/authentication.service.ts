import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  changes = new BehaviorSubject<string>(this.getUserFromLocalCache()?.role);

  private baseUrl = environment.BASE_URL + '/user'
  host = environment.BASE_URL;
  token: string | null;
  loggedInUsername: string | null;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, user);
  }

  public passwordReset(email: string): Observable<User> {
    return this.http.post<any>(`${this.host}/user/password-reset`, email);
  }

  public changePassword(code: any, password: string): Observable<any> {
    return this.http.post<any>(`${this.host}/user/change-password?code=${code}`, password, { observe: 'response' });
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): any {
    return JSON.parse(localStorage.getItem('user') as any);
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token as any;
  }

  verifyCode(code: string): Observable<any> {
    return this.http.post<any>(`${this.host}/user/verify?code=${code}`, code, { observe: 'response' });
  }

  resendToken(code: string): Observable<any> {
    return this.http.post<any>(`${this.host}/user/resend?code=${code}`, code, { observe: 'response' });
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
    return true;
  }

}
