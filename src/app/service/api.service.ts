import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cliente } from '../model/cliente';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/api/resources/dbcliente';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getClientes (): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(apiUrl)
      .pipe(
        catchError(this.handleError('getProdutos', []))
      );
  }

  getCliente(id: number): Observable<Cliente> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Cliente>(url).pipe(
      catchError(this.handleError<Cliente>(`getProduto id=${id}`))
    );
  }

  addCliente (cliente): Observable<Cliente> {
    return this.http.post<Cliente>(apiUrl, cliente, httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      catchError(this.handleError<Cliente>('addProduto'))
    );
  }

  updateCliente(id, cliente): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, cliente, httpOptions).pipe(
      catchError(this.handleError<any>('updateProduto'))
    );
  }

  deleteCliente (id): Observable<Cliente> {
    const url = `${apiUrl}/${id}`;

    return this.http.delete<Cliente>(url, httpOptions).pipe(
      catchError(this.handleError<Cliente>('deleteProduto'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}
