import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IGraphicCardListState } from '@core/models/graphic-cards-list-state.interface';
import { IServerResponseModel } from '@core/models/iserver-response.model';
import { MockServerResponse } from '@mocks/server-response.mock';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { SharedModule } from '@shared/shared.module';
import { GraphicCardsComponent } from './graphic-cards.component';
import { GraphicCardsListContainerComponent } from './components/graphic-cards-list-container/graphic-cards-list-container.component';
import { selectCards } from '@store/selectors/graphic-cards.selectors';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';
import { GraphicCardsListItemComponent } from './components/graphic-cards-list-item/graphic-cards-list-item.component';
import { DropdownSelectComponent } from '@shared/components/dropdown-select/dropdown-select.component';

describe('GraphicCardsComponent', () => {
  let fixture: ComponentFixture<GraphicCardsComponent>;
  let component: GraphicCardsComponent;
  let mockData: IServerResponseModel;
  let store: MockStore;
  let initialState: IGraphicCardListState;
  let mockCardsSelector: MemoizedSelector<IGraphicCardListState, IGraphicCardItem[]>;

  beforeEach(() => {
    mockData = MockServerResponse();
    initialState = { cards: [] };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GraphicCardsComponent,
        GraphicCardsListContainerComponent,
        GraphicCardsListItemComponent,
        DropdownSelectComponent
      ],
      imports: [SharedModule],
      providers: [
        provideMockStore({ initialState }),
        GraphicCardsListContainerComponent
      ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
    mockCardsSelector = store.overrideSelector(selectCards, []);
    fixture = TestBed.createComponent(GraphicCardsComponent);
    component = fixture.componentInstance;
    mockCardsSelector.setResult(mockData.details);
    store.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should render all the items received', (done: DoneFn) => {
    store.select(mockCardsSelector).subscribe(() => {
      expect(component.cards.length).toEqual(mockData.details.length);
      done();
    });
  });
});
