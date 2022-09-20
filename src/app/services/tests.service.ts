import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS, API_URL } from '../constants';
import { Test } from '../types';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  constructor(private http: HttpService) {}

  urlTests = `${API_URL}${API_ENDPOINTS.tests}`;
  urlTestsGroups = `${API_URL}${API_ENDPOINTS.testGroups}`;
  urlTestsTemplates = `${API_URL}${API_ENDPOINTS.testTemplates}`;
  urlTestsGroupsTemplates = `${API_URL}${API_ENDPOINTS.testGroupTemplates}`;

  getTests(id: string): Observable<Test[]> {
    return this.http.get(this.urlTests, {
      params: { id },
    });
  }
  getTestsGroups(id: string): Observable<any> {
    return this.http.get(this.urlTestsGroups, {
      params: { id },
    });
  }
  getTestsTemplates(): Observable<any> {
    return this.http.get(this.urlTestsTemplates);
  }
  createTestTemplates(data): Observable<any> {
    return this.http.post(this.urlTestsTemplates, { ...data });
  }
  getTestsGroupsTemplates(): Observable<any> {
    return this.http.get(this.urlTestsGroupsTemplates);
  }
  createTestGroupTemplate(data): Observable<any> {
    return this.http.post(this.urlTestsGroupsTemplates, { ...data });
  }
  removeTest(typeId): Observable<any> {
    return this.http.delete(this.urlTestsTemplates, { params: { typeId } });
  }
}
