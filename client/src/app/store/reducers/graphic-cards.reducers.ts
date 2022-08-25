import { createReducer, on } from '@ngrx/store';
import { GraphicCardsActions } from '@store/actions/graphic-cards.actions';

// export const initialState: object = {};

import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';

export interface IGraphicCardListState {
  cards: IGraphicCardItem[];
}

export const initialState: IGraphicCardListState = {
  cards: []
};

export const GraphicCardsReducer = createReducer(
  initialState,
  on(GraphicCardsActions.graphicCardsLoaded, (state, newState) => newState)
);
