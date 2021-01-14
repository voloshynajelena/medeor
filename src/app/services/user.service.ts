import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {API_ENDPOINTS, API_URL} from '../constants';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }
    user = JSON.parse(localStorage.getItem('currentUser'));
    urlUser = `${API_URL}${API_ENDPOINTS.user}`;

    update(user): Observable<any> {
        return this.http.put(this.urlUser, user);
    }

    register(user): Observable<any> {
        return this.http.post(this.urlUser, user);
    }


    delete(id): Observable<any> {
        return this.http.delete(this.urlUser, {params: {id}});
    }

    getUserData(id: string): Observable<any>  {
    return this.http.get(this.urlUser, {
      headers: { authorization: this.user?.token },
      params: { id } });
  }

}
