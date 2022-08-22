import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'graphic-cards/:id',
    loadChildren: () =>
      import('./pages/graphic-cards-detail/graphic-cards-detail.module').then(
        (m) => m.GraphicCardsDetailModule
      )
  },
  {
    path: 'graphic-cards',
    loadChildren: () =>
      import('./pages/graphic-cards/graphic-cards.module').then((m) => m.GraphicCardsModule)
  },
  {
    path: '',
    redirectTo: 'graphic-cards',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadChildren: () =>
      import('@shared/components/page404/page404.component').then((m) => m.Page404Component),
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
