import { Component, OnInit } from '@angular/core';
import {PageUtil} from '../../../utils';
import { MorrisJsModule } from 'angular-morris-js';
import {RouteService} from "../../../services/route.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public chartDonutOptions = {
    resize: true,
    toto: 'roro',
    colors: [
      '#F15A24',
      '#F5891D'
    ],
    // labelColor: '#cc241c',
  };

  public chartDonutData = [
    { label: 'Sales01', value: 12 },
    { label: 'Sales02', value: 30 },
    { label: 'Sales03', value: 20 },
  ];

  steps = '';
  isReadOnly = true;
  isEdit = true;
  creditReportTab = true;
  isCreditReportDone = false;
  isImportCreditReportDone = false;

  constructor(private routeService: RouteService,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.steps = params.steps;
    });
  }

  ngOnInit(): void {

  }

  backToDashboard(): void{
    this.isImportCreditReportDone = true;
    this.routeService.navigate('/dashboard');
  }

  importCreditReport(): void{
    this.isCreditReportDone = true;
    this.creditReportTab = false;

    console.log(this.isCreditReportDone);
    console.log(this.creditReportTab);
    PageUtil.hideModal('showIdentityIq');
  }

  edit(): void{
    this.isReadOnly = false;
    this.isEdit = false;
  }

  back(): void{
    this.isReadOnly = true;
    this.isEdit = true;
  }

  submit(): void{
    this.isReadOnly = true;
    this.isEdit = true;
  }

  showIdentityIqModal(): void{
    PageUtil.showModal('showIdentityIq');
  }

  showUnderwriting(): void {
    PageUtil.showModal('underWriting');
  }
}
