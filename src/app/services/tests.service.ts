import { Injectable } from '@angular/core';
import {API_URL} from '../constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(private http: HttpClient) { }
  // get userId and token from local storage
  user = JSON.parse(localStorage.getItem('currentUser'));

  urlTests = `${API_URL}/testsGroups`;

  getTestsGroups(id: string): Observable<any>  {
    return this.http.get(this.urlTests, {
      headers: { authorization: this.user?.token },
      params: { id } });
  }

}
