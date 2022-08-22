import { IGraphicCardListState } from '@core/models/graphic-cards-list-state.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectRootFeature = createFeatureSelector<IGraphicCardListState>('root');

export const selectCards = createSelector(
  selectRootFeature,
  (state: IGraphicCardListState) => state.cards
);
