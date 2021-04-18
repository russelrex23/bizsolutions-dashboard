import { Component, OnInit } from '@angular/core';
import {RouteService} from '../../services/route.service';
import { LandingPage } from './landing-page';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private routeService: RouteService) { }

  title = 'Biz Solutions';

  ngOnInit(): void {


    this.routeService.navigate('/home');
  }


}
