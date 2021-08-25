import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {HttpRequestService} from "./http-request.service";
import {HttpRequestService} from './http-request.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private statusUrl = '/api/status';

  constructor(private http: HttpClient, private httpRequestService: HttpRequestService) { }

  public  sendEmail(payload): Observable<any> {
    return this.httpRequestService.post('/api/email/send-confirmation-email', payload);
  }

  // Get the status
  getStatus(): Promise<void | any> {
    return this.http.get(this.statusUrl)
      .toPromise()
      .then((response) => {console.log(response); })
      .catch((error: any) => console.log('Error sending email: ', error));
  }
}
