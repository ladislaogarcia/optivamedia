import { createAction, props } from '@ngrx/store';
import { IGraphicCardListState } from '@core/models/graphic-cards-list-state.interface';

export const GraphicCardsActions = {
  loadGraphicCards: createAction('[Graphic Cards List] Load Graphics Cards'),

  graphicCardsLoaded: createAction(
    '[Graphic Cards List] Graphics Cards Loaded',
    props<IGraphicCardListState>()
  )
};
