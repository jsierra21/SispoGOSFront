import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { OrdersComponentsModule } from 'src/app/shared/components/orders/orders.components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    OrdersComponentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
