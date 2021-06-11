import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {RouteService} from '../../services/route.service';
import {PageUtil} from '../../utils';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  goals = [
    {
      data: 'Get "Lender Compliant" to where my company qualifies for credit without a Personal Guarantee'
    },
    {
      data: 'Get "Lender Compliant" for the purpose of securing funding for my business'
    },
    {
      data: 'Get "Lender Compliant" for the purpose of Purchasing Equipment for my business and or project'
    },
    {
      data: 'Get "Lender Compliant" for the purpose of Purchasing Real Estate'
    },
    {
      data: 'Get "Lender Compliant" for the purpose of a business deal (e.g. Government Contract, Prospective Partnership, New Business Launch, etc.)'
    },
    {
      data: 'Other: PLEASE SPECIFY'
    }
  ];

  selectedObject: any = this.goals[0];

  constructor(
    private authenticationService: AuthenticationService,
    private routeService: RouteService,
    private router: Router,
    private route: ActivatedRoute
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

  showGoals(): void {
    PageUtil.showModal('showGoals');
  }

  selectedGoal(): void{
    console.log(this.selectedObject);
  }

  openNav(): void{
    document.getElementById('sidebar').style.width = '250px';
    document.getElementById('content').style.marginLeft = '250px';
  }

  closeNav(): void{
    document.getElementById('sidebar').style.width = '0';
    document.getElementById('content').style.marginLeft = '0';
  }
}
