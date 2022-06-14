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
  getSingle(id: number) {
    return this.httpClient.get<IServerResponse<Kategorija>>(environment.api + `/kategorija/${id}`);
  }
  publishKategorija(name: string) {
    return this.httpClient.post<IServerResponse<Kategorija>>(environment.api + `/kategorija`, { name });
  }
  editKategorija(id: number, name: string) {
    return this.httpClient.patch<IServerResponse<Kategorija>>(environment.api + `/kategorija/${id}`, { name });
  }
}
