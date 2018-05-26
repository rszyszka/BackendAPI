import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Config } from './config';
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = 'assets/config.json';

  constructor(private htpp: HttpClient) { }

  getConfig() {
    return this.htpp.get<Config>(this.configUrl)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.htpp.get<Config>(
      this.configUrl, {
        observe: 'response'
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      console.error(
        'Backend returned code ${error.status}, ' +
        'body was: ${error.error}'
      );
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
