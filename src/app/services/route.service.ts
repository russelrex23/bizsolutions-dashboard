import { Injectable } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private router: Router) {
  }

  /**
   * Navigate to route.
   * @param route - url
   */
  public navigate(route: string): void {
    this.router.navigate([route]);
  }
}
