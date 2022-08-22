import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicCardsListItemComponent } from './graphic-cards-list-item.component';
import { IGraphicCardItem } from '@core/models/igraphic-card-item.model';

import { MockServerResponse } from '@mocks/server-response.mock';
import { By } from '@angular/platform-browser';

const card: IGraphicCardItem = MockServerResponse().details[0];

describe('GraphicCardsListItemComponent', () => {
  let component: GraphicCardsListItemComponent;
  let fixture: ComponentFixture<GraphicCardsListItemComponent>;

  /**
   * It takes a CSS Selector and returns the HTML Elements requested.
   * @param cssSelector Any css selector
   * @returns The HTML Elements related with that 'cssSelector'
   */
  function getElement<T>(cssSelector: string): T {
    return fixture.debugElement.query(By.css(cssSelector)).nativeElement;
  }

  /**
   * It gets a CSS Selector for an HTMLElement and returns its textContent property
   * @param cssSelector Any css selector
   * @returns The textContent property of the elements requested
   */
  function getElementText(cssSelector: string): string | null {
    return sanitizeString(getElement<HTMLElement>(cssSelector).textContent);
  }

  /**
   * It gets a CSS Selector for an HTMLImageElement and returns its 'src'
   * @param cssSelector Any css selector
   * @returns The textContent property of the elements requested
   */
  function getImageSrc(cssSelector: string): string | null {
    return sanitizeString(getElement<HTMLImageElement>(cssSelector).src);
  }

  /**
   * It gets a string splitted by / and returns the text since the last /
   * @param str String splitted by /
   * @returns The string after the last /
   */
  function getLastPath(str: string): string {
    return sanitizeString(str.split('/').slice(-1).join());
  }

  /**
   * Sanitize a string
   * @param str String to sanitize
   * @returns The same string in lowercase and trimmed.
   */
  function sanitizeString(str: string | null): string {
    return str ? str.toLocaleLowerCase().trim() : '';
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphicCardsListItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(GraphicCardsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.card = card;
    fixture.detectChanges();
  });

  describe('Rendering component', () => {
    it('should create', () => {
      expect(fixture.componentInstance).toBeTruthy();
    });
  });

  describe('Rendering data', () => {
    it('should receive and render a graphic card image', () => {
      const image: string = getImageSrc('.card__image') || '';
      const expected = sanitizeString(getLastPath(image));
      const reality = sanitizeString(getLastPath(card.original_image_url));
      expect(expected).toEqual(reality);
    });

    it('should receive and render the graphic card name', () => {
      const name: string | null = getElementText('.card__name');
      const expected = sanitizeString(name || '');
      const reality = sanitizeString(card.name);
      expect(expected).toEqual(reality);
    });

    it('should receive and render the graphic card manufacturer', () => {
      const manufacturer: string | null = getElementText('.card__manufacturer');
      const expected = sanitizeString(manufacturer || '');
      const reality = sanitizeString(card.manufacturer);
      expect(expected).toEqual(reality);
    });

    it('should receive and render the graphic card current price', () => {
      const priceText: string | null = getElementText('.card__price');
      const expected = priceText!.match(/[\d,\.]/g)?.join(''); // REMOVING ALL THE CHARACTERS EXCEPTS NUMBERS AND DECIMAL POINTS
      const reality = card.price.current.toFixed(2); // FIXING CARD PRICE FOR TWO DECIMALS FOR COMPARING WITH price
      expect(expected).toEqual(reality);
    });

    xit('should receive and render the graphic card average valoration', () => {
      const valoration: string | null = getElementText('.card__valoration');
      const expected = sanitizeString(valoration || '');
      const reality = sanitizeString(card.valoration.avg.toString());
      expect(expected).toEqual(reality);
    });
    // I have replaced the previous one for the following one because I have changed the data shown there. More dinamyc.
    it('should receive and render the graphic card id', () => {
      const id: string | null = getElementText('.card__valoration');
      const expected = sanitizeString(id || '');
      const reality = sanitizeString(card.id.toString());
      expect(expected!).toEqual(reality);
    });
  });
});
