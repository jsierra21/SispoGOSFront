import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AutoLoginGuard } from './core/guards/auto-login.guard';
import { IntroGuard } from './core/guards/intro.guard';

const routes: Routes = [
  {
    path: 'intro',
    loadChildren: () => import('./core/pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./core/pages/auth/login/login.module').then( m => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard]// Check if we should show the introduction or forward to inside
  },
  {
    path: 'options',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: 'information-sync',
    loadChildren: () => import('./core/pages/information-sync/information-sync.module').then( m => m.InformationSyncPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
