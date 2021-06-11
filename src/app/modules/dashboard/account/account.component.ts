import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

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

}
