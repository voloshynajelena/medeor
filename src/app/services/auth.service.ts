import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { API_ENDPOINTS, API_URL } from '../constants';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    url = `${API_URL}${API_ENDPOINTS.login}`;

    constructor(private http: HttpClient, private notification: NotificationService) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    async login(login, pass): Promise<any> {
        try {
            const user: any = await this.http.get(this.url, { params: { login, pass } }).toPromise()

            if (user?.error) {
                this.notification.throwError(user.error)
                return user
            }

            /**
             * Store user details and jwt token in local storage 
             * to keep user logged in between page refreshes
             */

            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;

        } catch (err) {
            console.log('error caught in service')
            console.error(err);

            //Handle the error here

            this.notification.throwError(err);
            //Rethrow it back to component
            return throwError(err.message);
        }

    }

    logout(): void {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
