import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  tap,
  Observable,
  withLatestFrom,
  delay,
  catchError,
  of,
  pluck
} from 'rxjs';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';

import { environment } from '@environments/environment';
import { IServerResponseModel } from '@core/models/iserver-response.model';

import { MockServerResponse } from '@mocks/server-response.mock';

@Injectable({
  providedIn: 'root'
})
export class GraphicCardsService {
  private api = environment.api;
  hostname =
    !this.api.port || this.api.port === '80'
      ? this.api.hostname
      : `${this.api.hostname}:${this.api.port}`;
  graphicCardsAPIEndpoint = `${this.hostname}/${this.api.endpoint}`;

  private graphicCardsBehaviourSubject: BehaviorSubject<IGraphicCardItem[]> = new BehaviorSubject<
    IGraphicCardItem[]
  >([]);
  graphicCards$: Observable<IGraphicCardItem[]> = this.graphicCardsBehaviourSubject as Observable<
    IGraphicCardItem[]
  >;

  constructor(private http: HttpClient) {
    this.manyReals();
  }

  manyReals() {
    for (let i = 0; i <= 4; i++) {
      this.loadDataReal();
    }
  }

  loadData(): void {
    this.loadDataReal();
  }

  loadDataMock(): void {
    of(MockServerResponse())
      .pipe(
        pluck('details'),
        catchError((error) => of(error)),
        withLatestFrom(this.graphicCards$),
        tap(
          ([
            newData,
            oldData
          ]) => {
            const allTogether = [
              ...oldData,
              ...newData
            ].map((item, id) => {
              item.id = id;
              return { ...item };
            });
            this.graphicCardsBehaviourSubject.next(allTogether);
          }
        )
      )
      .subscribe();
  }

  loadDataReal(): void {
    this.http
      .get<IServerResponseModel>(this.graphicCardsAPIEndpoint)
      .pipe(
        pluck('details'),
        catchError((error) => of(error)),
        withLatestFrom(this.graphicCards$),
        tap(
          ([
            newData,
            oldData
          ]) => {
            const allTogether = [
              ...oldData,
              ...newData
            ].map((item, id) => {
              const obj = { ...item };
              obj.id = id;
              return obj;
            });
            this.graphicCardsBehaviourSubject.next(allTogether);
          }
        )
      )
      .subscribe();
  }
}
