import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
import { GraphicCardsService } from '@core/services/graphic-cards.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graphic-cards',
  templateUrl: './graphic-cards.component.html',
  styleUrls: ['./graphic-cards.component.scss']
})
export class GraphicCardsComponent implements OnInit {
  cards$: Observable<IGraphicCardItem[]>;
  manufacturers: string[];
  models: string[];
  cards: IGraphicCardItem[];

  form: FormGroup;

  constructor(private service: GraphicCardsService) {
    this.form = new FormGroup({
      manufacturersCombo: new FormControl(''),
      modelsCombo: new FormControl('')
    });
    this.cards$ = this.service.graphicCards$;
    this.cards = [];
    this.manufacturers = [];
    this.models = [];
    this.cards$.subscribe((cards) => {
      this.cards = cards;
      this.manufacturers = [...new Set(cards.map((card) => card.manufacturer))];
      this.models = [...new Set(cards.map((card) => card.name))];
    });
  }

  getCardsByProperty(
    arr: IGraphicCardItem[],
    prop: keyof IGraphicCardItem,
    val: string
  ): IGraphicCardItem[] {
    return [...this.cards].filter((card: IGraphicCardItem) => {
      return card[prop] === val;
    });
  }

  mapCardsToModelList(arr: IGraphicCardItem[]): string[] {
    return arr.map((card) => card.name);
  }

  ngOnInit(): void {
    const manufacturersCombo = this.form.get('manufacturersCombo');
    const modelsCombo = this.form.get('modelsCombo');
    manufacturersCombo?.valueChanges.subscribe((data) => {
      const cards = this.getCardsByProperty(this.cards, 'manufacturer', manufacturersCombo?.value);
      const manufacturer: string | undefined = cards.length ? cards[0].manufacturer : '';
      const isSameManufacturer = cards.find(
        (card: IGraphicCardItem) => card.name === modelsCombo?.value
      );
      if (!isSameManufacturer) {
        modelsCombo?.setValue('');
      }
      this.models = !manufacturer
        ? this.mapCardsToModelList(this.cards)
        : this.mapCardsToModelList(this.getCardsByProperty(this.cards, 'manufacturer', data));
    });
    modelsCombo?.valueChanges.subscribe((data) => {
      if (!modelsCombo.value) {
        return;
      }
      const card: IGraphicCardItem | undefined = this.cards.find(
        (card: IGraphicCardItem) => card.name === data
      );
      if (card?.manufacturer !== manufacturersCombo?.value) {
        manufacturersCombo?.setValue(card?.manufacturer);
      }
    });
  }

  loadMoreData() {
    this.service.loadData();
  }
}
