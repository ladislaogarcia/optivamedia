import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphicCardsDetailComponent } from '@pages/graphic-cards-detail/graphic-cards-detail.component';

const routes: Routes = [
  {
    path: '**',
    component: GraphicCardsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphicCardsDetailRoutingModule {}
