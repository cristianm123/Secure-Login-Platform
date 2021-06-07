import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login';
import { JwtDTO } from '../models/jwt-dto';
import {AUTH_ENDPOINT, USER_ENDPOINT} from "../utils/app.endpoints";
import {CreateUser} from "../models/create-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public logIn(userLogin: UserLogin): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(AUTH_ENDPOINT + 'login', userLogin);
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }

  public createUser(user: CreateUser): Observable<any> {
    return this.httpClient.post<any>(USER_ENDPOINT + 'create', user);
  }
}
