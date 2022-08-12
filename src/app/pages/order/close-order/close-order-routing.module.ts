import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CloseOrderPage } from './close-order.page';

const routes: Routes = [
  {
    path: '',
    component: CloseOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseOrderPageRoutingModule {}
