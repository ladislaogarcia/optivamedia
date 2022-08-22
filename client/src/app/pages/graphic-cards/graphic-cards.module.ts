import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { GraphicCardsRoutingModule } from './graphic-cards-routing.module';
import { GraphicCardsComponent } from './graphic-cards.component';
import { GraphicCardsListContainerComponent } from './components/graphic-cards-list-container/graphic-cards-list-container.component';
import { GraphicCardsListItemComponent } from './components/graphic-cards-list-item/graphic-cards-list-item.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    GraphicCardsComponent,
    GraphicCardsListContainerComponent,
    GraphicCardsListItemComponent
  ],
  imports: [
    CommonModule,
    GraphicCardsRoutingModule,
    HttpClientModule,
    SharedModule
  ]
})
export class GraphicCardsModule {}
