import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExecuteOrderPage } from './execute-order.page';

const routes: Routes = [
  {
    path: '',
    component: ExecuteOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExecuteOrderPageRoutingModule {}
