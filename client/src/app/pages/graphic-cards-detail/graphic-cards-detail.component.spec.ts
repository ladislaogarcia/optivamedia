import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicCardsDetailComponent } from './graphic-cards-detail.component';

describe('GraphicCardsDetailComponent', () => {
  let component: GraphicCardsDetailComponent;
  let fixture: ComponentFixture<GraphicCardsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphicCardsDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GraphicCardsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
