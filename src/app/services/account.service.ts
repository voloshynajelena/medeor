import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';
// СЕРВИС содержит только методы которые
// нужны для получения доступов
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  // подключаем HttpClient
  constructor(private http: HttpClient) {}

  // метод ниже возвращает Observable
  getUserId(login, pass): Observable<any> {
    // обращаемся к GET методу в http
    // и передаем ему url и переменные, которые будет ждать этот endpoint
    return this.http.get(`${API_URL}/getUser`, { params: { login, pass } });
  }
}
