import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IServerResponse } from '../interfaces/serverResponse';
import { LoginUser, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    return this.httpClient.post<IServerResponse<LoginUser>>(environment.api + `/auth/login`, { username, password });
  }
}