import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';

export interface IServerResponseModel {
  error: boolean;
  statusCode: number;
  message: string;
  details: IGraphicCardItem[];
}
