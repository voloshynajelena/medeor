import { Injectable } from '@angular/core';
import { Client, ClientDataInput } from '../types';
import { API_ENDPOINTS, API_URL } from '../constants';
import { Observable, of } from 'rxjs';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  urlClient = `${API_URL}${API_ENDPOINTS.client}`;
  urlClients = `${API_URL}${API_ENDPOINTS.clients}`;

  constructor(private http: HttpService) { }

  createClient(data: ClientDataInput): Observable<any> {
    return this.http.post(this.urlClient, { ...data });
  }

  updatePatient(data: any): Observable<any> {
    return this.http.put(this.urlClient, { ...data });
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(this.urlClient, { params: { id } });
  }


  getClientData(id: string): Observable<any> {
    return this.http.get(this.urlClient, {
      params: { id }
    });
  }

  getClients(id: string): Observable<any> {
    return this.http.get(this.urlClients, {
      params: { id }
    });
  }
}