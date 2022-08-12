import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersPage } from './orders.page';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage,
  },
  {
    path: 'execute/:id',
    loadChildren: () => import('../../pages/order/execute-order/execute-order.module').then(m => m.ExecuteOrderPageModule)
  },
  {
    path: 'close/:id',
    loadChildren: () => import('../../pages/order/close-order/close-order.module').then(m => m.CloseOrderPageModule)
  },
  {
    path: 'view/:id',
    loadChildren: () => import('../../pages/order/view-order/view-order.module').then(m => m.ViewOrderPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersPageRoutingModule {}
