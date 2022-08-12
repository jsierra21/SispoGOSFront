import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CloseOrderPageRoutingModule } from './close-order-routing.module';

import { CloseOrderPage } from './close-order.page';
import { OrdersComponentsModule } from '../../../shared/components/orders/orders.components.module';
import { DynamicFormElementComponent } from 'src/app/shared/components/dynamic-form-element/dynamic-form-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CloseOrderPageRoutingModule,
    OrdersComponentsModule
  ],
  declarations: [CloseOrderPage, DynamicFormElementComponent]
})
export class CloseOrderPageModule {}
