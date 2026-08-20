import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'digital-literacy',
    loadChildren: () => import('./digital-literacy/digital-literacy.module').then( m => m.DigitalLiteracyPageModule)
  },
  {
    path: 'transport',
    loadChildren: () => import('./transport/transport.module').then( m => m.TransportPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
