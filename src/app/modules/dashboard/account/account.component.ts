import { Component, OnInit } from '@angular/core';
import {PageUtil} from '../../../utils';
import { MorrisJsModule } from 'angular-morris-js';

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

  isReadOnly = true;
  isEdit = true;

  constructor() { }

  ngOnInit(): void {

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
}
