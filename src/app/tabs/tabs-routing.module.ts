import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDataResolver } from '../core/resolvers/user-data.resolver';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    resolve:{
      userData: UserDataResolver
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
      },
      {
        path: '',
        redirectTo: '/options/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/options/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
