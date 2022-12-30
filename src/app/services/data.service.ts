import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CommonService} from './common.service';
import {retry, catchError} from 'rxjs/operators';
import {BehaviorSubject, interval, Observable, throwError} from 'rxjs';
import {AuthService} from './auth.service';
import { Router } from '@angular/router';

export interface IUserResponse {
  total: number;
  list: User[];
}

export class User {
  constructor(public username: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpHeader: any;
  getUrl = environment.API_URL;
  environmentObj = environment;
  // httpHeader = {
  //   // headers: new HttpHeaders({
  //   //   'Content-Type': 'application/json',
  //   //   'Authorization': 'Bearer ' + this.common.bearertoken
  //   // })
  // }

  httpDataHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  };

  httpFormDataHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  };

  constructor(private https: HttpClient, private common: CommonService, public auth: AuthService, private router: Router) {

  }

  headerData(){
    const token = this.common.getCookie(this.environmentObj.tokenKey) ? JSON.parse(decodeURIComponent(this.common.getCookie(this.environmentObj.tokenKey))).bearertoken : '';
    this.httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  token
      })
    };
  }

  getJson(path: string, query:string): Observable<any> {
    this.headerData();
    const checkAuthenticateUser = this.https.get(this.getUrl + path + query, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
      checkAuthenticateUser.subscribe(data=>{
        if(data){
          if(data['code'] == 401){
            this.auth.eraseCookie(this.environmentObj.tokenKey);
            localStorage.removeItem(this.environmentObj.componentGroupPermission);
            localStorage.removeItem(this.environmentObj.allComponentPermission);
            this.router.navigate(['login']);
          }
          else{
            
          }
        }
        else{
          this.auth.eraseCookie(this.environmentObj.tokenKey);
          localStorage.removeItem(this.environmentObj.componentGroupPermission);
          localStorage.removeItem(this.environmentObj.allComponentPermission);
          this.router.navigate(['login']);
        }
      });
      return checkAuthenticateUser;
  }

  post(resource: any, path: string): Observable<any> {
    this.headerData();
    return this.https.post(this.getUrl + path, resource, this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getdata(id: string, path: string): Observable<any> {
    this.headerData();
    return this.https.get(this.getUrl + path + '/' + '?id=' + id, this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }
  
  create(resource: object, path: string) {
    this.headerData();
    return this.https.post(this.getUrl + path, JSON.stringify(resource), this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  list(path: string): Observable<any> {
    this.headerData();
    return this.https.get(this.getUrl + path + '/', this.httpHeader);
  }

  get(path: string, params?: any) {
    this.headerData();
    return this.https.get(this.getUrl + path + '/' + params ? params : '', this.httpHeader)
      .pipe(
        retry(1),
        catchError(this.httpError)
      );
  }
  
  postJson(resource: any, path: string): Observable<any> {
    this.headerData();
    return this.https.post(this.getUrl + path + '/', JSON.stringify(resource), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

 

  httpError(error: { error: { message: string; }; status: any; message: any; }) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }


}
