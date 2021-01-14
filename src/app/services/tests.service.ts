import { Injectable } from '@angular/core';
import {API_ENDPOINTS, API_URL} from '../constants';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  constructor(private http: HttpClient) { }

  user = JSON.parse(localStorage.getItem('currentUser'));
  urlTests = `${API_URL}${API_ENDPOINTS.tests}`;
  urlTestsGroups = `${API_URL}${API_ENDPOINTS.testGroups}`;
  urlTestsTemplates = `${API_URL}${API_ENDPOINTS.testTemplates}`;
  urlTestsGroupsTemplates = `${API_URL}${API_ENDPOINTS.testGroupTemplates}`;

  getTests(id: string): Observable<any>  {
    return this.http.get(this.urlTests, {
      headers: { authorization: this.user?.token },
      params: { id } });
  }
  getTestsGroups(id: string): Observable<any>  {
    return this.http.get(this.urlTestsGroups, {
      headers: { authorization: this.user?.token },
      params: { id } });
  }
  getTestsTemplates(): Observable<any>  {
    return this.http.get(this.urlTestsTemplates);
  }
  createTestTemplates(data): Observable<any>  {
    return this.http.post(this.urlTestsTemplates, { ...data  });
  }
  getTestsGroupsTemplates(): Observable<any>  {
    return this.http.get(this.urlTestsGroupsTemplates);
  }
}
