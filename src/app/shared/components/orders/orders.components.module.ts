import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { OrderListComponent } from './orders-list/orders-list.component';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OrderDetailComponent } from './order-detail/order-detail.component';
@NgModule({
  declarations: [OrderListComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ScrollingModule,
  ],
  exports: [OrderListComponent, OrderDetailComponent],
})
export class OrdersComponentsModule {}
