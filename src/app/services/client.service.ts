import { Injectable } from '@angular/core';
import {Client, ClientDataInput} from '../types';
import {HttpClient} from '@angular/common/http';

import {API_ENDPOINTS, API_URL} from '../constants';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  user = JSON.parse(localStorage.getItem('currentUser'));
  urlClient = `${API_URL}${API_ENDPOINTS.client}`;
  urlClients = `${API_URL}${API_ENDPOINTS.clients}`;

  constructor(private http: HttpClient) {}

  createClient(data: ClientDataInput): Observable<any> {
    return this.http.post<Client>(this.urlClient, { ...data  });
  }

  updatePatient(data: any): Observable<any> {
    return this.http.put<Client>(this.urlClient, { ...data  });
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete<any>(this.urlClient,  {params: {id}});
  }


  getClientData(id: string): Observable<any> {
    return this.http.get(this.urlClient, {
      headers: { authorization: this.user?.token },
      params: { id } });
  }

  getClients(id: string): Observable<any> {
    return this.http.get(this.urlClients, {
      headers: { authorization: this.user?.token },
      params: { id } });
  }
}
