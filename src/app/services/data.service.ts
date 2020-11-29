import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  configUrl = 'https://api-medeor.herokuapp.com/getUser';

  getData(data) {
    return this.http.get(this.configUrl, { params: { name: 'test', pass: 'Qweqwe34' } });
  }
}
