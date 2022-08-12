import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeOrderTypeModalPageRoutingModule } from './change-order-type-modal-routing.module';

import { ChangeOrderTypeModalPage } from './change-order-type-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChangeOrderTypeModalPageRoutingModule
  ],
  declarations: [ChangeOrderTypeModalPage]
})
export class ChangeOrderTypeModalPageModule {}
