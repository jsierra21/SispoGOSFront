import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExecuteOrderPageRoutingModule } from './execute-order-routing.module';

import { ExecuteOrderPage } from './execute-order.page';

import { OrdersComponentsModule } from 'src/app/shared/components/orders/orders.components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExecuteOrderPageRoutingModule,
    OrdersComponentsModule
  ],
  declarations: [ExecuteOrderPage]
})
export class ExecuteOrderPageModule {}
