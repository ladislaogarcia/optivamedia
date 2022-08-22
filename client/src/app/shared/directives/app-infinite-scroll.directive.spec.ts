import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppInfiniteScrollDirective } from './app-infinite-scroll.directive';

@Component({
  template: `
    <div appInfiniteScroll (scrolled)="onScrolled($event)">
      <span></span>
    </div>
  `,
  styles: [
    `
      :host,
      .container,
      span {
        display: block;
        width: 100%;
      }

      :host {
        height: 100%;
        overflow: auto;
      }

      span {
        height: 1900px;
      }
    `
  ]
})
class TestComponent {
  hasBeenScrolled: boolean;

  constructor() {
    this.hasBeenScrolled = false;
  }

  onScrolled($event: Event): any {
    this.hasBeenScrolled = true;
  }
}

describe('AppInfiniteScrollDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppInfiniteScrollDirective,
        TestComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });
});
