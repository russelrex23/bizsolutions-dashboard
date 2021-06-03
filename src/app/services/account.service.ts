import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {GenericObject} from '../models/generic-object';
import {HttpRequestService} from './http-request.service';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpRequestService: HttpRequestService) { }

  public createAccount(payload: GenericObject): Observable<Account> {
    return this.httpRequestService.post('/auth/register', payload);
  }

  /**
   * Update authenticated user info.
   * @param payload - info
   */
  public update(payload: GenericObject): Observable<Account> {
    return this.httpRequestService.put('/user-update', payload);
  }
}
