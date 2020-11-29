import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient) {}

  url = `${API_URL}/getUserData`;

  getUserData(id: string) {
    return this.http.get(this.url, { params: { id } });
  }
}
