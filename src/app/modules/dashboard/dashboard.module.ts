import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { PlanComponent } from './plan/plan.component';
import { OtherComponent } from './other/other.component';
import { AccountComponent } from './account/account.component';
import { MorrisJsModule } from 'angular-morris-js';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    PlanComponent,
    OtherComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MorrisJsModule
  ]
})
export class DashboardModule { }
