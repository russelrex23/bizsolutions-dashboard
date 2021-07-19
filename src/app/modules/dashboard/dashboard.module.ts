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
import { SignaturePadModule } from 'angular2-signaturepad';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LcpPersonalComponent } from './lcp-personal/lcp-personal.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    HomeComponent,
    ProductsComponent,
    PlanComponent,
    OtherComponent,
    AccountComponent,
    LcpPersonalComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MorrisJsModule,
    SignaturePadModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ]
})
export class DashboardModule { }
