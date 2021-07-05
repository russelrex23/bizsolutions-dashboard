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

  steps = '';

  constructor(
    private authenticationService: AuthenticationService,
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.steps = params.steps;
      console.log(this.steps);
    });
  }

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

  openNav(): void{
    document.getElementById('mySidenav').style.width = '250px';
    document.getElementById('content').style.marginLeft = '250px';
  }

  closeNav(): void{
    document.getElementById('sidebar').style.width = '0';
    document.getElementById('content').style.marginLeft = '0';
  }

  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggler = document.getElementById('sidebarToggler');

    if (sidebar && sidebarToggler) {
      let sidebarMarginLeft = 0;
      let sidebarTogglerDisplay = 'none';

      if (sidebar.style.marginLeft === '0px') {
        sidebarMarginLeft = -250;
        sidebarTogglerDisplay = 'block';
      }

      sidebar.style.marginLeft = `${sidebarMarginLeft}px`;
      sidebarToggler.style.display = sidebarTogglerDisplay;
    }
  }
}
