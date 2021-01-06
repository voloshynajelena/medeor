import { Injectable } from '@angular/core';
import {Client, ClientDataInput} from '../types';
import {HttpClient} from '@angular/common/http';
import {API_URL} from '../constants';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  user = JSON.parse(localStorage.getItem('currentUser'));
  urlClient = `${API_URL}/client`;
  constructor(private http: HttpClient) {}

  createPatient(data: ClientDataInput): Observable<any> {
    return this.http.post<Client>(this.urlClient, { ...data  });
  }
  
  updatePatient(data: any): Observable<any> {
    return this.http.put<Client>(this.urlClient, { ...data  });
  }

  deletePatient(id: string): Observable<any> {
    return this.http.delete<any>(this.urlClient,  {params: {id}});
  }

}
