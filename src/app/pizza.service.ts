import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, tap, catchError} from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private url = "https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza";

  constructor(private log: MessageService, private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result: T) {
    return (error: T): Observable<T> => {
      console.error(error);  
      return of(error);
    };
  }

  getList(){
    return this.http.get(this.url).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError('getList', []))
    );
  }

  cancelOrder(id: Number){
    return this.http.delete(this.url + `/${id}`).pipe(
      catchError(this.handleError('cancelOrder', []))
    );
  }

  postOrder(data: any){
    return this.http.post(this.url, {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'body': data
    }).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError('postOrder', []))
    );
  }


}
