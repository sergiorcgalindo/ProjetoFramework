import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Fruta } from '../models/fruta';


@Injectable({
  providedIn: 'root'
})
export class FrutaService {

  url = 'https://localhost:44364/api/Frutas'; // api swagger

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

   // Obtem todas as frutas
   getFrutas(): Observable<Fruta[]> {
    return this.httpClient.get<Fruta[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getFrutaById(idFruta: number): Observable<Fruta> {
    return this.httpClient.get<Fruta>(this.url + '/' + idFruta)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva fruta
  saveFruta(fruta: Fruta): Observable<Fruta> {
    return this.httpClient.post<Fruta>(this.url, JSON.stringify(fruta), this.httpOptions)
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  }

  // autualiza fruta
  updateFruta(fruta: Fruta): Observable<Fruta> {
    return this.httpClient.put<Fruta>(this.url + '/' + fruta.idFruta, JSON.stringify(fruta), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta fruta
  deleteFruta(fruta: Fruta) {
    return this.httpClient.delete<Fruta>(this.url + '/' + fruta.idFruta, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };
}
