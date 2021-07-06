import { Component, OnInit } from '@angular/core';

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

  public chartDonutData = [
    { label: 'Sales01', value: 12 },
    { label: 'Sales02', value: 30 },
    { label: 'Sales03', value: 20 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
