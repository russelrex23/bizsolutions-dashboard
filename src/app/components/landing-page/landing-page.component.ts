import { Component, OnInit } from '@angular/core';
import {RouteService} from '../../services/route.service';
import { LandingPage } from './landing-page';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  isLcpPersonal = false;
  isLcpCorporate = false;
  isStrategic = false;
  isSignIn = false;
  isSignUp = false;
  isAuth = false;
  isProduct = true;

  constructor(private routeService: RouteService) { }

  title = 'Biz Solutions';

  ngOnInit(): void {
    this.routeService.navigate('/');
  }

  showProduct(): void {
    this.isProduct = true;
    this.isAuth = false;
    this.isLcpPersonal = false;
    this.isLcpCorporate = false;
    this.isStrategic = false;
  }

  showLcpPersonal(): void {
    this.isLcpPersonal = true;
    this.isProduct = false;
    this.isLcpCorporate = false;
    this.isStrategic = false;
    this.isAuth = false;
  }

  showLcpCorporate(): void {
    this.isLcpCorporate = true;
    this.isProduct = false;
    this.isLcpPersonal = false;
    this.isStrategic = false;
    this.isAuth = false;
  }

  showStrategic(): void {
    this.isStrategic = true;
    this.isProduct = false;
    this.isLcpCorporate = false;
    this.isLcpPersonal = false;
    this.isAuth = false;
  }

  showAuth(): void {
    this.isAuth = true;
    this.isStrategic = false;
    this.isProduct = false;
    this.isLcpCorporate = false;
    this.isLcpPersonal = false;
    window.location.href = '/#products';
  }

  showSignIn(): void {
    this.isSignIn = true;
    this.isStrategic = false;
    this.isProduct = false;
    this.isLcpCorporate = false;
    this.isLcpPersonal = false;
  }

  showSignUp(): void {
    this.isSignUp = true;
    this.isStrategic = false;
    this.isProduct = false;
    this.isLcpCorporate = false;
    this.isLcpPersonal = false;
  }

}
