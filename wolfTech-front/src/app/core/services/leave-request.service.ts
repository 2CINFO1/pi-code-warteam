import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { LeaveModel } from 'src/app/shared/model/congeModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  constructor(
    private httpClient: HttpClient
  ) { }

  backEndApi = environment.backEndApi;

    httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    createLeaveRequest (body) {
      return this.httpClient.post(this.backEndApi + 'conges/add', body);
    }

    readLeaveRequests () {
      return this.httpClient.get(this.backEndApi + 'conges/display');
    }
    getAllLeave(): Observable<LeaveModel[]> {
      return this.httpClient
        .get<LeaveModel[]>(
          this.backEndApi + 'conges/display',
          this.httpHeader
        );
    }
    updateStatus(leave: LeaveModel): Observable<LeaveModel[]> {
     return this.httpClient.post<LeaveModel[]>(this.backEndApi + 'conges/updateStatus', leave);
    }

    processError(err: any) {
      let message = '';
      if (err.error instanceof ErrorEvent) {
        message = err.error.message;
      } else {
        message = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
      return throwError(() => {
        // tslint:disable-next-line:no-unused-expression
        message;
      });
    }

}
