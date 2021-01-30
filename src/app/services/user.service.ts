import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS, API_URL } from '../constants';
import { Observable } from 'rxjs';
import { User } from '../types';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private http: HttpService,
        private httpClient: HttpClient,

    ) { }

    urlUser = `${API_URL}${API_ENDPOINTS.user}`;

    updatePatch(user): Observable<any> {
        return this.httpClient.patch(`${API_URL}/user`, user);
    }

    update(user): Observable<User> {
        return this.http.put(this.urlUser, user);
    }

    register(user): Observable<User> {
        return this.http.post(this.urlUser, user);
    }

    delete(id): Observable<User[]> {
        return this.http.delete(this.urlUser, { params: { id } });
    }

    getUserData(id: string): Observable<User> {
        return this.http.get(this.urlUser, {
            params: { id }
        });
    }

}
