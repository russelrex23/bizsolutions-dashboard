import { Component, OnInit } from '@angular/core';
import {PageUtil} from '../../../utils';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  stepCorporate = false;
  ULine = false;

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

  showStepCorporate(): void{
    this.stepCorporate = true;
  }

  showULine(): void{
    this.ULine = true;
  }

  backToSteps(): void{
    this.stepCorporate = false;
    this.ULine = false;
  }

}
