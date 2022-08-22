import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
import { Store } from '@ngrx/store';
import { GraphicCardsActions } from '@store/actions/graphic-cards.actions';
import { selectCards } from '@store/selectors/graphic-cards.selectors';
import { Subscription } from 'rxjs';
Store;

@Component({
  selector: 'app-graphic-cards',
  templateUrl: './graphic-cards.component.html',
  styleUrls: ['./graphic-cards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphicCardsComponent implements OnInit {
  manufacturers: string[];
  models: string[];
  cards: IGraphicCardItem[];

  form: FormGroup;

  cardsSubscription!: Subscription | undefined;
  manufacturersSuscription!: Subscription | undefined;
  modelsSubscription!: Subscription | undefined;

  constructor(private store: Store) {
    this.form = new FormGroup({
      manufacturersCombo: new FormControl(''),
      modelsCombo: new FormControl('')
    });
    this.cards = [];
    this.manufacturers = [];
    this.models = [];
    this.cardsSubscription = this.store.select(selectCards).subscribe((cards) => {
      if (cards) {
        this.cards = cards;
        this.manufacturers = [...new Set(cards.map((card) => card.manufacturer))];
        this.models = [...new Set(cards.map((card) => card.name))];
      }
    });
    this.loadMoreData();
  }

  getCardsByProperty(
    arr: IGraphicCardItem[],
    prop: keyof IGraphicCardItem,
    val: string
  ): IGraphicCardItem[] {
    return [...arr].filter((card: IGraphicCardItem) => {
      return card[prop] === val;
    });
  }

  mapCardsToModelList(arr: IGraphicCardItem[]): string[] {
    return arr.map((card) => card.name);
  }

  ngOnInit(): void {
    const manufacturersCombo = this.form.get('manufacturersCombo');
    const modelsCombo = this.form.get('modelsCombo');
    this.manufacturersSuscription = manufacturersCombo?.valueChanges.subscribe((data) => {
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
    this.modelsSubscription = modelsCombo?.valueChanges.subscribe((data) => {
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
    this.store.dispatch(GraphicCardsActions.loadGraphicCards());
  }

  onDestroy(): void {
    this.cardsSubscription?.unsubscribe();
    this.manufacturersSuscription?.unsubscribe();
    this.modelsSubscription?.unsubscribe();
  }
}
