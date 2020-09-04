import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CompetitionsService {
  private baseUrl = 'https://api.football-data.org/v2/';
  private token = '268441ffe8a44c0bb3c81c41f467bf07';
  httpOptions = {
    headers: new HttpHeaders({
      'X-Auth-Token': this.token,
    }),
  };

  constructor(private http: HttpClient) {}

  getCompetitions(): Observable<object> {
    return this.http
      .get(`${this.baseUrl}competitions?plan=TIER_ONE `, this.httpOptions) //TIER_ONE for the free data-s
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

  getMatchesForCompetition(id: number) {
    return this.http
      .get(`${this.baseUrl}competitions/${id}/matches`, this.httpOptions)
      .pipe(
        tap(
          () => {},
          (err) => {
            this.handleError('getMatchesForCompetition', err);
          }
        )
      );
  }

  getMatchDetailsById(id: string) {
    return this.http.get(`${this.baseUrl}matches/${id}`, this.httpOptions)
    .pipe(
      tap(
        () => {},
        (err) => {
          this.handleError('getMatchDetailsById', err);
        }
      )
    )
  }
}
