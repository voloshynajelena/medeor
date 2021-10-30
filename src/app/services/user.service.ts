import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS, API_URL } from '../constants';
import { Observable } from 'rxjs';
import { User } from '../types';
import { HttpService } from './http.service';
import { catchError, map } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(
        private http: HttpService,
        private httpClient: HttpClient,
        private notification: NotificationService,
    ) { }

    urlUser: string = `${API_URL}${API_ENDPOINTS.user}`;

    updatePatch(user): Observable<any> {
        return this.httpClient.patch(`${API_URL}/user`, user);
    }

    update(user): Observable<User> {
        return this.http.put(this.urlUser, user);
    }

    register(user): Observable<User | null> {
        return this.httpClient
        .post(this.urlUser, user)
        .pipe(
          map(
            (data: any) => {
              if(data?.error) {
                this.notification.throwError(data?.error);
                return null;
              }
              return data as User;
            }
          ),
          catchError(
            e => {
              console.error('Error: ', e);
              this.notification.throwError(e);
              return e;
            }
          ));
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
