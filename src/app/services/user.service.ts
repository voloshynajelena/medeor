import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any[]>(`${API_URL}/users`);
    }
    update(user): Observable<any> {
        return this.http.put(`${API_URL}/user`, user);
    }
    updatePatch(user): Observable<any> {
        return this.http.patch(`${API_URL}/user`, user);
    }
    register(user): Observable<any> {
        return this.http.post(`${API_URL}/user`, user);
    }
    delete(id): Observable<any> {
        return this.http.delete(`${API_URL}/user`, {params: {id}});
    }
}
