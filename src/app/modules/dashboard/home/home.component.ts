import { Component, OnInit } from '@angular/core';
import {PageUtil} from '../../../utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }

  showGoals(): void {
    PageUtil.showModal('goals');
  }

  showLcpIntakeForm(): void {
    PageUtil.showModal('lcpIntakeForm');
  }

  stepOne(): void{
    PageUtil.click('step-one');
  }

  stepTwo(): void{
    PageUtil.click('step-two');
  }

  stepThree(): void{
    PageUtil.click('step-three');
  }

  stepFour(): void{
    PageUtil.click('step-four');
  }

  stepFive(): void{
    PageUtil.click('step-five');
  }
}
