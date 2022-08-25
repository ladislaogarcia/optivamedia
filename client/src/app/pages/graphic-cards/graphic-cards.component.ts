import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
import { Store } from '@ngrx/store';
import { DropdownSelectComponent } from '@shared/components/dropdown-select/dropdown-select.component';
import { GraphicCardsActions } from '@store/actions/graphic-cards.actions';
import { selectCards } from '@store/selectors/graphic-cards.selectors';
import { Subscription } from 'rxjs';
import { GraphicCardsListContainerComponent } from './components/graphic-cards-list-container/graphic-cards-list-container.component';
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

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.form = new FormGroup({
      manufacturersControl: new FormControl(''),
      modelsControl: new FormControl('')
    });
    this.cards = [];
    this.manufacturers = [];
    this.models = [];
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
    this.cardsSubscription = this.store.select(selectCards).subscribe((cards) => {
      if (cards) {
        this.cards = cards;
        this.manufacturers = [...new Set(cards.map((card) => card.manufacturer))];
        this.models = [...new Set(cards.map((card) => card.name))];
        this.cdr.detectChanges();
      }
    });
    this.loadMoreData();
    const manufacturersControl = this.form.get('manufacturersControl');
    const modelsControl = this.form.get('modelsControl');
    this.manufacturersSuscription = manufacturersControl?.valueChanges.subscribe((data) => {
      const cards = this.getCardsByProperty(
        this.cards,
        'manufacturer',
        manufacturersControl?.value
      );
      const manufacturer: string | undefined = cards.length ? cards[0].manufacturer : '';
      const isSameManufacturer = cards.find(
        (card: IGraphicCardItem) => card.name === modelsControl?.value
      );
      if (!isSameManufacturer) {
        modelsControl?.setValue('');
      }
      this.models = !manufacturer
        ? this.mapCardsToModelList(this.cards)
        : this.mapCardsToModelList(this.getCardsByProperty(this.cards, 'manufacturer', data));
    });
    this.modelsSubscription = modelsControl?.valueChanges.subscribe((data) => {
      if (!modelsControl.value) {
        return;
      }
      const card: IGraphicCardItem | undefined = this.cards.find(
        (card: IGraphicCardItem) => card.name === data
      );
      if (card?.manufacturer !== manufacturersControl?.value) {
        manufacturersControl?.setValue(card?.manufacturer);
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
