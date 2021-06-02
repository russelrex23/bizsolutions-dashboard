import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request.service';
import {Observable} from 'rxjs';
import {Authorization} from '../models/authorization';
import {GenericObject} from '../models/generic-object';
import {RouteService} from './route.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private routeService: RouteService, private httpRequestService: HttpRequestService) {

  }
  public getAuthenticatedAccount(): Observable<Account> {
    return this.httpRequestService.get('/accounts/authenticated');
  }

  public authenticate(payload: GenericObject): Observable<Authorization> {
    return this.httpRequestService.post('/auth/sign_in', payload);
  }
}
