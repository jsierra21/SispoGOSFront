import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersPage } from './orders.page';

import { OrdersPageRoutingModule } from './orders-routing.module';
import { OrdersComponentsModule } from 'src/app/shared/components/orders/orders.components.module';
//import { CloseOrderPageModule } from 'src/app/pages/order/close-order/close-order.module';
import { ExecuteOrderPageModule } from 'src/app/pages/order/execute-order/execute-order.module';
import { AddItemModalPageModule } from 'src/app/pages/order/add-item-modal/add-item-modal.module';
import { ChangeOrderTypeModalPageModule } from 'src/app/pages/order/change-order-type-modal/change-order-type-modal.module';
import { DynamicFormElementComponent } from 'src/app/shared/components/dynamic-form-element/dynamic-form-element.component';
import { ScrollVanishDirective } from 'src/app/core/directives/scroll-vanish.directive';
import { SearchFiltersPageModule } from 'src/app/pages/order/search-filters/search-filters.module';
//import { ViewOrderPageModule } from 'src/app/pages/order/view-order/view-order.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersPageRoutingModule,
    OrdersComponentsModule,
    ExecuteOrderPageModule,
    AddItemModalPageModule,
    ChangeOrderTypeModalPageModule,
    SearchFiltersPageModule,
    //CloseOrderPageModule,
    //ViewOrderPageModule,
  ],
  declarations: [OrdersPage, ScrollVanishDirective]
})
export class OrdersPageModule {}
