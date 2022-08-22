import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockServerResponse } from '@mocks/server-response.mock';

import { GraphicCardsListContainerComponent } from './graphic-cards-list-container.component';

describe('GraphicCardsListContainerComponent', () => {
  let component: GraphicCardsListContainerComponent;
  let fixture: ComponentFixture<GraphicCardsListContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphicCardsListContainerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GraphicCardsListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive and render all the items provided', () => {
    const mocks = MockServerResponse();
    component.cards = mocks.details;
    fixture.detectChanges();
    const expected: number = fixture.debugElement.children.length;
    const reality: number = mocks.details.length;
    expect(expected).toEqual(reality);
  });
});
