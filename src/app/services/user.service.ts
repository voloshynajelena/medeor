import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../constants';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<any[]>(`${API_URL}/users`);
    }

    register(user) {
        return this.http.post(`${API_URL}/addUser`, user);
    }

    delete(id) {
        return this.http.delete(`${API_URL}/users/${id}`);
    }
}
