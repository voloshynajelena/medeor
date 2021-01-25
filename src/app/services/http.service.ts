import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { NotificationService } from "./notification.service";


@Injectable({ providedIn: 'root' })
export class HttpService {
    user = JSON.parse(localStorage.getItem('currentUser'));
    defaultOptions = { headers: { authorization: this.user?.token } }

    constructor(private http: HttpClient, private notification: NotificationService) {
    }

    private pipeCallback(data: any): Observable<any> {

        if (data?.error) {
            this.notification.throwError(data.error)
        };
        return data;
    }

    private errorHandler(err): Observable<never> {
        console.log('error caught in service')
        console.error('error: ', err);

        this.notification.throwError(err);
        //Rethrow it back to component
        return throwError(err);

    }

    public get(url = '/', options = {}): Observable<any> {
        const propsOption = { ...this.defaultOptions, ...options }
        return this.http.get(url, propsOption).pipe(
            map(this.pipeCallback.bind(this)),
            catchError(this.errorHandler.bind(this))
        );
    }

    public put(url = '/', body = {}, options = {}): Observable<any> {
        const propsOption = { ...this.defaultOptions, ...options }
        return this.http.put(url, body, propsOption).pipe(
            map(this.pipeCallback.bind(this)),
            catchError(this.errorHandler.bind(this)));
    }

    public post(url = '/', body = {}, options = {}): Observable<any> {
        const propsOption = { ...this.defaultOptions, ...options }
        return this.http.post(url, body, propsOption).pipe(
            map(this.pipeCallback.bind(this)),
            catchError(this.errorHandler.bind(this)));
    }

    public delete(url = '/', options = {}): Observable<any> {
        const propsOption = { ...this.defaultOptions, ...options }
        return this.http.post(url, propsOption).pipe(
            map(this.pipeCallback.bind(this)),
            catchError(this.errorHandler.bind(this)));
    }
}
