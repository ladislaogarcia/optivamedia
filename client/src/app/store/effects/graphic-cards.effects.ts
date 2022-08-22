import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GraphicCardsActions } from '../actions/graphic-cards.actions';
import { Observable, tap, Subscription, catchError } from 'rxjs';
import { GraphicCardsService } from '@core/services/graphic-cards.service';
import { Action, Store } from '@ngrx/store';
import { IGraphicCardListState } from '@core/models/graphic-cards-list-state.interface';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';

@Injectable()
export class GraphicCardsEffects {
  subscription!: Subscription;

  constructor(
    private actions$: Actions,
    private gcService: GraphicCardsService,
    private store: Store
  ) {}

  basicStyle = 'padding: 14px; font-size: 16px';

  loadGraphicCardsEffect$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GraphicCardsActions.loadGraphicCards),
        tap(() => {
          if (!this?.subscription) {
            this.subscription = this.gcService.graphicCards$.subscribe(
              (items: IGraphicCardItem[]) => {
                const newState: IGraphicCardListState = {
                  cards: items
                };
                this.store.dispatch(GraphicCardsActions.graphicCardsLoaded(newState));
              }
            );
          } else {
            this.gcService.loadData();
          }
        })
      ),
    { dispatch: false }
  );
}
