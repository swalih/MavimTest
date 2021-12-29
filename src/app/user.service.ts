import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1";

  user_logged_in = false;
  user: User = {} as User;


  constructor(private http: HttpClient) { 
    //for debugging purposes only
    this.user_logged_in = true;
  }

  clearUser(){
    this.user_logged_in = false;
    this.user = {} as User;
  }

  verifyUser(user: User){
    //use when backend is available
    /*return this.http.post(this.url, user)
      .pipe(
        tap(_ => console.log(`fetched userdata`)),
        catchError(this.handleError('verifyUser', []))
      );
      */

      if(user.username == "test" && user.password == "test"){
        this.user_logged_in = true;
        this.user = user;
        return true;
      }

      return false;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);  
      return of(result as T);
    };
  }

}
