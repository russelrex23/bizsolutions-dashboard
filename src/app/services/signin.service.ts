import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {HttpRequestService} from './http-request.service';
import {Observable} from 'rxjs';
import {RouteService} from './route.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(private routeService: RouteService, private httpRequestService: HttpRequestService,
              private httpClient: HttpClient) {
  }

  public authenticate(payload) {
    return this.httpRequestService.post('/signin.php', payload);
  }

}
