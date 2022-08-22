import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphicCardsComponent } from './graphic-cards.component';

const routes: Routes = [
  {
    path: '**',
    component: GraphicCardsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraphicCardsRoutingModule {}
