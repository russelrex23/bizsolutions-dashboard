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
  isLoading = false;

  constructor(private routeService: RouteService) { }

  title = 'Biz Solutions';

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.routeService.navigate('/');
    }, 1000);
  }

  goToSignUp(): void {
    this.routeService.navigate('/sign-up');
  }

  registration(): void {
    this.routeService.navigate('/registration');
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

  hideLcpPersonal(): void {
    this.isLcpPersonal = false;
  }

  showLcpCorporate(): void {
    this.isLcpCorporate = true;
    this.isProduct = false;
    this.isLcpPersonal = false;
    this.isStrategic = false;
    this.isAuth = false;
  }

  hideLcpCorporate(): void {
    this.isLcpCorporate = false;
  }

  showStrategic(): void {
    this.isStrategic = true;
    this.isProduct = false;
    this.isLcpCorporate = false;
    this.isLcpPersonal = false;
    this.isAuth = false;
  }

  hideStrategic(): void {
    this.isStrategic = false;
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
