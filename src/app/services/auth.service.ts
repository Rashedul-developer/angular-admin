import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { retry, catchError } from 'rxjs/operators';


export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLogin = false;
  url = environment.API_URL; 
  environmentObj = environment;
  constructor(private https: HttpClient, private router: Router) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  httpDataHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
  }

  login(data: object): Observable<any> {
    const uri = this.url + 'login';
    return this.https.post(uri, JSON.stringify(data), this.httpHeader)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  loggedIns(): boolean {
    return !! this.getCookie(this.environmentObj.tokenKey)
}


 // tslint:disable-next-line: typedef
 setCookie(cookieName: string, cookieValue: string, expireDays: number) {
  const d = new Date();
  d.setTime(d.getTime() + (expireDays * 9000 * 60 * 9000000));
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cookieName + '=' + cookieValue + ';' + expires + ';path=/';
}

// tslint:disable-next-line: typedef
getCookie(cookieName: string) {
  const name = cookieName + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

eraseCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

 // tslint:disable-next-line: typedef
 logOut(){
  this.eraseCookie(this.environmentObj.tokenKey);
  localStorage.removeItem(this.environmentObj.componentGroupPermission);
  localStorage.removeItem(this.environmentObj.allComponentPermission);
  this.router.navigate(['login']);
}

  // tslint:disable-next-line: typedef
  httpError(error: any) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
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
