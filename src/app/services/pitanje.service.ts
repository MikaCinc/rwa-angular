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

  getAllByCategory(categoryId: number) {
    return this.httpClient.get<IServerResponse<Pitanje[]>>(environment.api + `/pitanje/kategorija/${categoryId}`);
  }

  publishPitanje(text: string, isCorrect: boolean, categories: number[] = []) {
    return this.httpClient.post<IServerResponse<Pitanje>>(environment.api + `/pitanje`, { text, isCorrect, categories });
  }

  editPitanje(id: number, text: string, isCorrect: boolean, categories: number[] = []) {
    return this.httpClient.patch<IServerResponse<Pitanje>>(environment.api + `/pitanje/${id}`, { text, isCorrect, categories });
  }
}
