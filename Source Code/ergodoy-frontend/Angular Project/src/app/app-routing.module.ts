import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './navigation/main/main.component';
import { ConsumptionComponent } from './components/consumption/consumption.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AdviserComponent } from './components/adviser/adviser.component';

const routes: Routes = [
  {path: "", pathMatch:"full", redirectTo: "/customer"},
  {path: "customer", component: CustomerComponent, data: {animation: 'Customer'}},
  {path: "consumption", component: ConsumptionComponent, data: {animation: 'Consumption'}},
  {path: "adviser", component: AdviserComponent, data: {animation: 'Adviser'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
