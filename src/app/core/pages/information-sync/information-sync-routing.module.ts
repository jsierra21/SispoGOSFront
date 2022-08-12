import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformationSyncPage } from './information-sync.page';

const routes: Routes = [
  {
    path: '',
    component: InformationSyncPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformationSyncPageRoutingModule {}
