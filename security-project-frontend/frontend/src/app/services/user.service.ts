import { Injectable } from '@angular/core';
import { USER_ENDPOINT } from "../utils/app.endpoints";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { UserDto } from "../models/user-dto";

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private roles: Array<string> = [];

  constructor(
    private httpClient: HttpClient
  ) { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  getLastLoginDate(): Observable<Date> {
    return this.httpClient.get<Date>(USER_ENDPOINT + `get/login`);
  }

  getAllUsers(): Observable<string[]> {
    return this.httpClient.get<string[]>(USER_ENDPOINT + `get`);
  }

  deleteUser(username: string): Observable<any> {
    return this.httpClient.delete<string>(USER_ENDPOINT + `delete`, {
      params: {
        username
      }
    });
  }

  changePassword(newPassword: string): Observable<any> {
    return this.httpClient.put<string>(USER_ENDPOINT + `change`, null, {
      params: {
        newPassword
      }
    });
  }

  blankPassword(username: string): Observable<any> {
    return this.httpClient.put<string>(USER_ENDPOINT + `blank`, null,{
      params: {
        username
      }
    });
  }
}
