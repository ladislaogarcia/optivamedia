import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
@Component({
  selector: 'app-graphic-cards-list-item',
  templateUrl: './graphic-cards-list-item.component.html',
  styleUrls: ['./graphic-cards-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicCardsListItemComponent {
  @Input() card!: IGraphicCardItem;
  @Output() clicked: EventEmitter<IGraphicCardItem>;

  constructor() {
    this.clicked = new EventEmitter();
  }

  onClick(card: IGraphicCardItem): void {
    this.clicked.emit(card);
  }
}
