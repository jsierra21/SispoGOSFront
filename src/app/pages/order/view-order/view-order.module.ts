import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewOrderPageRoutingModule } from './view-order-routing.module';

import { ViewOrderPage } from './view-order.page';
import { OrdersComponentsModule } from 'src/app/shared/components/orders/orders.components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ViewOrderPageRoutingModule,
    OrdersComponentsModule
  ],
  declarations: [ViewOrderPage]
})
export class ViewOrderPageModule {}
