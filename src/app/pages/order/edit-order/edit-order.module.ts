import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOrderPageRoutingModule } from './edit-order-routing.module';

import { EditOrderPage } from './edit-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditOrderPageRoutingModule
  ],
  declarations: [EditOrderPage]
})
export class EditOrderPageModule {}
