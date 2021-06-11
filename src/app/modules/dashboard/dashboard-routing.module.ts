import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AccountComponent} from './account/account.component';
import {OtherComponent} from './other/other.component';
import {PlanComponent} from './plan/plan.component';
import {ProductsComponent} from './products/products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'plan',
    component: PlanComponent
  },
  {
    path: 'other',
    component: OtherComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
