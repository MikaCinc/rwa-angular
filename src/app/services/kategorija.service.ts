import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IServerResponse } from '../interfaces/serverResponse';
import { Kategorija } from '../models/kategorija';

@Injectable({
  providedIn: 'root',
})
export class KategorijaService {
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<IServerResponse<Kategorija[]>>(environment.api + '/kategorija');
  }
}
