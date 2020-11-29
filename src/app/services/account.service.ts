import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {}
  
  url = `${API_URL}/getUser`;

  getUserId(login, pass) {
    return this.http.get(this.url, { params: { login, pass } });
  }
}
