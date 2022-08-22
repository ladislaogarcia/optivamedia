import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicCardsDetailRoutingModule } from '@pages/graphic-cards-detail/graphic-cards-detail-routing.module';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { GraphicCardsDetailComponent } from './graphic-cards-detail.component';

@NgModule({
  declarations: [GraphicCardsDetailComponent],
  imports: [
    CommonModule,
    GraphicCardsDetailRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class GraphicCardsDetailModule {}
