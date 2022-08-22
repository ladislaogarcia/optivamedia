import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
@Component({
  selector: 'app-graphic-cards-list-container',
  templateUrl: './graphic-cards-list-container.component.html',
  styleUrls: ['./graphic-cards-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicCardsListContainerComponent {
  @Input() cards: IGraphicCardItem[] | null;

  constructor(private router: Router) {
    this.cards = [];
  }

  showClicked(id: number): void {
    this.router.navigate([
      '/graphic-cards',
      id
    ]);
  }
}
