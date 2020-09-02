import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompetitionsService {
  private baseUrl = '/api/';
  private token = '268441ffe8a44c0bb3c81c41f467bf07';
  httpOptions = {
    headers: new HttpHeaders({
      'Acces-Control-Allow-Origin': '*',
      'Acces-Control-Allow-Headers':
        'acces-control-allow-headers, acces-control-allow-origin ,x-auth-token, content-type, x-response-control, Authorization, origin, accept, X-Requested-With',
      'Acces-Control-Allow-Method': '*',
      'X-Auth-Token': this.token,
      'Content-Type': 'text/plain',
    }),
  };

  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<object> {
    return this.http
      .get(`${this.baseUrl}competitions?plan=TIER_ONE`, this.httpOptions)
      .pipe(
        tap(
          () => {},
          (err) => {
            this.handleError('getCompetitions', err);
          }
        )
      );
  }

  handleError(operation = 'op', err: any) {
    console.error(err);
  }

  getCompetitionById(id: number) {
    return this.http
      .get(`${this.baseUrl}competitions/${id}/matches`, this.httpOptions)
      .pipe(
        tap(
          () => {},
          (err) => {
            this.handleError('getCompetitionById', err);
          }
        )
      );
  }
}
