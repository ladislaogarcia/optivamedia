import { createReducer, on } from '@ngrx/store';
import { GraphicCardsActions } from '@store/actions/graphic-cards.actions';

export const initialState: object = {};

export const GraphicCardsReducers = {
  loadItemsReducer: createReducer(
    initialState,
    on(GraphicCardsActions.graphicCardsLoaded, (state, newState) => newState)
  )
};
