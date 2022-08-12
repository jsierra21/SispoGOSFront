import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddItemModalPageRoutingModule } from './add-item-modal-routing.module';

import { AddItemModalPage } from './add-item-modal.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddItemModalPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [AddItemModalPage]
})
export class AddItemModalPageModule {}
