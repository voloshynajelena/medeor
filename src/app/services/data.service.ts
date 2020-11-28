import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  configUrl = 'https://api-medeor.herokuapp.com/url';

  getData(data) {
    return this.http.get(this.configUrl, { params: { code: data } });
  }
}
