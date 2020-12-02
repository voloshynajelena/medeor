import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';
// СЕРВИС содержит только методы которые 
// получают данные пользователей и клиентов
@Injectable({
  providedIn: 'root',
})
export class DataService {
  // подключаем HttpClient
  constructor(private http: HttpClient) {}

  // создаем URL's используя переменную, которая хранит адрес API
  // подставляя окончание, обозначающее метод в API
  urlUser = `${API_URL}/getUserData`;
  urlClient = `${API_URL}/getClient`;
  urlClients = `${API_URL}/getClients`;

  // методы ниже возвращают Observable
  // обращаемся к GET методу в http 
  // и передаем ему url и переменные, которые будет ждать этот endpoint

  getUserData(id: string): Observable<any>  {
    return this.http.get(this.urlUser, { params: { id } });
  }
  getClientData(id: string): Observable<any> {
    return this.http.get(this.urlClient, { params: { id } });
  }
  getClientsData(id: string): Observable<any> {
    return this.http.get(this.urlClients, { params: { id } });
  }
}
