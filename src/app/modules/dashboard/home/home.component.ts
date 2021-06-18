import { Component, OnInit } from '@angular/core';
import {PageUtil} from '../../../utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showGoals(): void {
    PageUtil.showModal('goals');
  }

  showUnderwriting(): void {
    PageUtil.showModal('underWriting');
  }

}
