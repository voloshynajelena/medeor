import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  // connect HttpClient
  constructor(private http: HttpClient) {}

  // get userId and token from local storage
  user = JSON.parse(localStorage.getItem('currentUser'));

  urlUser = `${API_URL}/getUserData`;
  urlClient = `${API_URL}/getClient`;
  urlClients = `${API_URL}/getClients`;

  getUserData(id: string): Observable<any>  {
    return this.http.get(this.urlUser, {
      headers: { authorization: this.user?.token },
      params: { id } });
  }
  getClientData(id: string): Observable<any> {
    return this.http.get(this.urlClient, {
      headers: { authorization: this.user?.token },
      params: { id } });
  }
  getClientsData(id: string): Observable<any> {
    return this.http.get(this.urlClients, {
      headers: { authorization: this.user?.token },
      params: { id } });
  }
}
