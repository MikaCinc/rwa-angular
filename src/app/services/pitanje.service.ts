import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuestionTypeEnum } from '../enums';
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

  getSingle(id: number) {
    return this.httpClient.get<IServerResponse<Pitanje>>(environment.api + `/pitanje/${id}`);
  }

  getAllByCategory(categoryId: number) {
    return this.httpClient.get<IServerResponse<Pitanje[]>>(environment.api + `/pitanje/kategorija/${categoryId}`);
  }

  publishPitanje(text: string, qType: QuestionTypeEnum, answer: string, isCorrect: boolean, categories: number[] = []) {
    return this.httpClient.post<IServerResponse<Pitanje>>(environment.api + `/pitanje`, { text, type: qType, answer, isCorrect, categories });
  }

  editPitanje(id: number, text: string, qType: QuestionTypeEnum, answer: string, isCorrect: boolean, categories: number[] = []) {
    return this.httpClient.patch<IServerResponse<Pitanje>>(environment.api + `/pitanje/${id}`, { text, type: qType, answer, isCorrect, categories });
  }

  deletePitanje(id: number, token: string) {
    var headers_object = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': 'application/json',
    });

    const httpOptions = {
      headers: headers_object,
    };

    return this.httpClient.delete<IServerResponse<Pitanje>>(environment.api + `/pitanje/${id}`, httpOptions);
  }
}
