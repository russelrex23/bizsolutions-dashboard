import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {RouteService} from '../../services/route.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private routeService: RouteService
  ) { }

  ngOnInit(): void {
  }

  signOut(): void {
    this.routeService.navigate('/sign-in');
    // this.authenticationService.signOut().subscribe(() => {
    //   localStorage.removeItem('token');
    //   this.routeService.navigate('/sign-in');
    // });
  }
}
