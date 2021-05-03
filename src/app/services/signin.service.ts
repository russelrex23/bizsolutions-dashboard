import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import {HttpRequestService} from './http-request.service';
import {Observable} from 'rxjs';
import {GenericObject} from '../../models/generic-object';
import {Authorization} from '../../models/authorization';
import {RouteService} from './route.service';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  constructor(private routeService: RouteService, private httpRequestService: HttpRequestService,
              private httpClient: HttpClient) {
  }

  public authenticate(payload): Observable<Authorization> {
    return this.httpRequestService.post('/signin.php', payload);
  }

}
