import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'presentation', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'presentation',
    loadChildren: () =>
      import('./presentation/presentation.module').then(
        m => m.PresentationPageModule
      )
  },
  {
    path: 'chantier-detail/:id',
    loadChildren: () =>
      import('./chantier-detail/chantier-detail.module').then(
        m => m.ProductDetailPageModule
      )
  },
  {
    path: 'chantier-add',
    loadChildren: () =>
      import('./chantier-add/chantier-add.module').then(
        m => m.ProductAddPageModule
      )
  },
  {
    path: 'chantier-edit/:id',
    loadChildren: () =>
      import('./chantier-edit/chantier-edit.module').then(
        m => m.ProductEditPageModule
      )
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
