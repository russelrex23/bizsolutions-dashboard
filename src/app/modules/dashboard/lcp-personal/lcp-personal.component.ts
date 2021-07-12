import { Component, OnInit } from '@angular/core';
import {PageUtil} from '../../../utils';

@Component({
  selector: 'app-lcp-personal',
  templateUrl: './lcp-personal.component.html',
  styleUrls: ['./lcp-personal.component.css']
})
export class LcpPersonalComponent implements OnInit {
  public chartDonutOptions = {
    resize: true,
    toto: 'roro',
    colors: [
      '#F15A24',
      '#F5891D'
    ],
    // labelColor: '#cc241c',
  };

  public chart = {
    xkey: 'y',
    ykeys: ['a'],
    labels: ['Series A']
  };

  public chartDonutData = [
    { label: 'Sales01', value: 12 },
    { label: 'Sales02', value: 30 },
    { label: 'Sales03', value: 20 },
  ];

  public chartAreaData = [
    { y: '2006', a: 100, b: 90 },
    { y: '2007', a: 75,  b: 65 },
    { y: '2008', a: 50,  b: 40 },
    { y: '2009', a: 75,  b: 65 },
    { y: '2010', a: 50,  b: 40 },
    { y: '2011', a: 75,  b: 65 },
    { y: '2012', a: 100, b: 90 }
  ];

  hutton = false;

  constructor() { }

  ngOnInit(): void {
  }

  showSimulate(): void{
    PageUtil.showModal('simulate');
  }

  backToSteps(): void{
    this.hutton = false;
  }

  showHutton(): void{
    this.hutton = true;
  }
}
