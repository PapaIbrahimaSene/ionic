import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Chantier } from './chantier';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'http://localhost:3000/api/v1/chantier';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getProducts(): Observable<Chantier[]> {
    return this.http.get<Chantier[]>(apiUrl).pipe(
      tap(chantier => console.log('fetched chantier')),
      catchError(this.handleError('getProducts', []))
    );
  }

  getProduct(id: any): Observable<Chantier> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Chantier>(url).pipe(
      tap(_ => console.log(`fetched chantier id=${id}`)),
      catchError(this.handleError<Chantier>(`getProduct id=${id}`))
    );
  }

  addProduct(chantier: Chantier): Observable<Chantier> {
    return this.http.post<Chantier>(apiUrl, chantier, httpOptions).pipe(
      tap((prod: Chantier) => console.log(`added chantier w/ id=${prod.chantierId}`)),
      catchError(this.handleError<Chantier>('addProduct'))
    );
  }

  updateProduct(id: any, chantier: any): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, chantier, httpOptions).pipe(
      tap(_ => console.log(`updated chantier id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(id: any): Observable<Chantier> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Chantier>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted chantier id=${id}`)),
      catchError(this.handleError<Chantier>('deleteProduct'))
    );
  }
}
