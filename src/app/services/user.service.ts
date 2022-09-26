import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_ENDPOINTS, API_URL } from '../constants';
import { User } from '../types';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpService,
    private httpClient: HttpClient,
    private notification: NotificationService
  ) {}

  urlUser = `${API_URL}${API_ENDPOINTS.user}`;

  // updating user data after edit
  public user$ = new Subject<User>();

  public changeUserData(user: User): void {
    this.user$.next(user);
  }

  updatePatch(user): Observable<any> {
    return this.httpClient.patch(`${API_URL}/user`, user);
  }

  update(user): Observable<User> {
    return this.http.put(this.urlUser, user);
  }

  register(user): Observable<User | null> {
    return this.httpClient.post(this.urlUser, user).pipe(
      map((data: any) => {
        if (data?.error) {
          this.notification.throwError(data?.error);
          return null;
        }
        return data as User;
      }),
      catchError((e) => {
        console.error('Error: ', e);
        this.notification.throwError(e);
        return e;
      })
    );
  }

  delete(id): Observable<User[]> {
    return this.http.delete(this.urlUser, { params: { id } });
  }

  getUserData(id: string): Observable<User> {
    return this.http.get(this.urlUser, {
      params: { id },
    });
  }
}
