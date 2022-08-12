import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationSyncPageRoutingModule } from './information-sync-routing.module';

import { InformationSyncPage } from './information-sync.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformationSyncPageRoutingModule
  ],
  declarations: [InformationSyncPage]
})
export class InformationSyncPageModule {}
