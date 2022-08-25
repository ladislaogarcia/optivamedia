import { HttpClient } from '@angular/common/http';
import { MockServerResponse } from '@mocks/server-response.mock';
import { IServerResponseModel } from '@core/models/iserver-response.model';

import { GraphicCardsService } from '@core/services/graphic-cards.service';
import { delay, of } from 'rxjs';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';

describe('GraphicCardsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: GraphicCardsService;
  let mockData: IServerResponseModel;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj(HttpClient, ['get']);
    service = new GraphicCardsService(httpClientSpy, true);
    mockData = MockServerResponse();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('graphicCards$ : should receive and emit the data received', () => {
    httpClientSpy.get.and.returnValue(of(mockData));
    service.loadData();
    service.graphicCards$.subscribe((data: IGraphicCardItem[]) => {
      expect(mockData.details).toEqual(data);
    });
  });
});
