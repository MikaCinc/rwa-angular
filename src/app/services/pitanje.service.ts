import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IServerResponse } from '../interfaces/serverResponse';
import { Pitanje } from '../models/pitanje';

@Injectable({
  providedIn: 'root',
})
export class PitanjeService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<IServerResponse<Pitanje[]>>(environment.api + '/pitanje');
  }
}
