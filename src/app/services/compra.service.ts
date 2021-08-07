import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Fruta } from '../models/fruta';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  url = 'https://localhost:44364/api/Frutas'; // api swagger

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Diminui o Estoque
  updateFruta(fruta: Fruta): Observable<Fruta> {
    fruta.qtdFruta = fruta.qtdFruta - 1;
    return this.httpClient.put<Fruta>(this.url + '/' + fruta.idFruta, JSON.stringify(fruta), this.httpOptions)
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
