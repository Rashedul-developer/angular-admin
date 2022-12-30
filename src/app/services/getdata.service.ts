import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError as observableThrowError, Observable} from 'rxjs'
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Appsettings } from '../core_classes/appsettings';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetdataService {
  apikey = Appsettings.getApiKey();
  // getUrl = Appsettings.getUrl();
  getUrl =  environment.API_URL;
  constructor(private http: HttpClient) { }

  getdataTable (path, itemPerPage, searchQuery, itemStartAt, columnsName, orderUserName) {
   return this.http.get(this.getUrl + path + '?search=' + searchQuery + '&columns=' + columnsName + '&order=' + orderUserName + '&start=' + itemStartAt + '&length=' + itemPerPage).pipe(catchError(this.errorHandler));
  
  }

  getTreedata(id, tokenid, path): Observable<any> {
      // tslint:disable-next-line: max-line-length
    return this.http.get(this.getUrl + path + '/?apikey=' + this.apikey + '&id=' + id + '&tokenid=' + tokenid).pipe(catchError(this.errorHandler));

  }

  getdownlineList(path, id, pagereqest, rowperpage, selectSide, membertype,producttype): Observable<any> {
     // tslint:disable-next-line: max-line-length
    return this.http.get(this.getUrl + path + '/' + this.apikey + '?id=' + id + '&pagereqest=' + pagereqest + '&rowperpage=' + rowperpage + '&side=' + selectSide +'&membertype=' + membertype+ '&producttype=' + producttype).pipe(catchError(this.errorHandler));
  }

    getdownlineListDate(path, id, pagereqest, rowperpage, st, ed, selectSide, membertype,producttype): Observable<any> {
     // tslint:disable-next-line: max-line-length
    return this.http.get(this.getUrl + path + '/' + this.apikey + '?id=' + id + '&pagereqest=' + pagereqest + '&rowperpage=' + rowperpage + '&st=' + st + '&ed=' + ed + '&side=' + selectSide + '&membertype=' + membertype + '&producttype=' + producttype).pipe(catchError(this.errorHandler));
  }

     getaccountType(path, id): Observable<any> {
     // tslint:disable-next-line: max-line-length
    return this.http.get(this.getUrl + path + '/' + this.apikey + '?id=' + id).pipe(catchError(this.errorHandler));
  }

  getdata(path, id, side): Observable<any> {
    return this.http.get(this.getUrl + path + '/' + this.apikey + '?id=' + id + '&side=' + side).pipe(catchError(this.errorHandler));

  }
  
  getpromodata(path, id, membertype): Observable<any> {
     // tslint:disable-next-line: max-line-length
    return this.http.get(this.getUrl + path + '/' + this.apikey + '?id=' + id + '&membertype=' + membertype).pipe(catchError(this.errorHandler));

  }

  getdownlinePromo(path, id, pagereqest, rowperpage, membertype): Observable<any> {
    // tslint:disable-next-line: max-line-length
   return this.http.get(this.getUrl + path + '/' + this.apikey + '?id=' + id + '&pagereqest=' + pagereqest + '&rowperpage=' + rowperpage + '&membertype=' + membertype).pipe(catchError(this.errorHandler));
 }

 getdataall(path): Observable<any> {
  return this.http.get(this.getUrl + path ).pipe(catchError(this.errorHandler));

}

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Server Error')
     // return throwError(error)
   }

}
