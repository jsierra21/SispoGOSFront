import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeOrderTypeModalPage } from './change-order-type-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeOrderTypeModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeOrderTypeModalPageRoutingModule {}
