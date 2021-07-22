import { HandleErrorService } from './handle-error.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { stringify } from 'querystring';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessAPIService {
  private readonly baseUrl = 'http://localhost:53011/api';
  public readonly photosUrl = '';
  public readonly userUrl = 'User';
  public readonly registrationUrl = 'registration';
  public readonly productUrl = 'Product';

  constructor(private httpClient: HttpClient, private handleError: HandleErrorService) { }

  isUniqueEmail(email: string): Observable<any> {
    const urlSection = 'Registration/IsUniqueEmail';
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify({email: email});

    return this.httpClient
               .post(`${this.baseUrl}/${urlSection}`, body, {'headers': headers});
  }

  getAll(urlSection: string): Observable<any> {
    return this.httpClient
               .get(`${this.baseUrl}/${urlSection}`)
               .pipe(catchError(this.handleError.logError));
  }

  getOne(urlSection: string, id: number): Observable<any> {
    return this.httpClient
               .get(`${this.baseUrl}/${urlSection}/${id}`)
               .pipe(catchError(this.handleError.logError));
  }

  add(urlSection: string, entity:any): Observable<any>{
    const body = JSON.stringify(entity);
    const headers = {'content-type': 'application/json'};

    return this.httpClient
              .post(`${this.baseUrl}/${urlSection}`,
                          body, {'headers': headers})
              .pipe(catchError(this.handleError.logError));
  }

  update(urlSection: string, id: number, entity:any): Observable<any>{
    const body = JSON.stringify(entity);
    const headers = {'content-type': 'application/json'};

    return this.httpClient
              .put(`${this.baseUrl}/${urlSection}/${id}`,
                          body, {'headers': headers})
              .pipe(catchError(this.handleError.logError));
  }

  delete(urlSection: string, id: number): Observable<any>{
    return this.httpClient
               .delete(`${this.baseUrl}/${urlSection}/${id}`)
               .pipe(catchError(this.handleError.logError));
  }

  uploadPhoto(urlSection: string, val: any) {
    this.httpClient.post(`${this.baseUrl}/${urlSection}`, val)
                    .pipe(catchError(this.handleError.logError));
  }
}
