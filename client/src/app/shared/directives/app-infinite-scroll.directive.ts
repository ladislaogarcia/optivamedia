import {
  Directive,
  ElementRef,
  OnInit,
  Output,
  Renderer2,
  EventEmitter,
  HostListener
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { ApplicationRef } from '@angular/core';

interface StyleRules {
  name: string;
  value: string;
}

@Directive({
  selector: '[appInfiniteScroll]'
})
export class AppInfiniteScrollDirective implements OnInit {
  @Output() scrolled: EventEmitter<any> = new EventEmitter();

  // Rxjs 'fromEvent' did not working always
  @HostListener('scroll', ['$event.target'])
  onScroll(elem: EventTarget): void {
    this.checkScrollBottom(elem);
  }

  private styleRules: StyleRules[] = [
    {
      name: 'display',
      value: 'block'
    },
    {
      name: 'height',
      value: '100%'
    },
    {
      name: 'overflow-y',
      value: 'auto'
    },
    {
      name: 'scroll-behavior',
      value: 'smooth'
    }
  ];

  constructor(private el: ElementRef, private renderer2: Renderer2, private app: ApplicationRef) {}

  ngOnInit(): void {
    this.applyStyles();

    // Rxjs 'fromEvent' did not working always

    // fromEvent(this.el.nativeElement, 'scroll').subscribe((elem: any): void => {
    //   this.checkScrollBottom(elem);
    // });
  }

  private checkScrollBottom(elem: EventTarget): boolean {
    const { offsetHeight, scrollTop, scrollHeight }: any = elem;
    const isScrolledBottom = offsetHeight + scrollTop >= scrollHeight;
    isScrolledBottom && this.scrolled.emit();
    return isScrolledBottom;
  }

  private applyStyles() {
    if (this.app.components.length) {
      const appRoot = this.app.components[0].location.nativeElement;
      this.renderer2.setStyle(appRoot, 'display', 'block');
      this.renderer2.setStyle(appRoot, 'height', '100%');
    }
    this.styleRules.forEach((style) =>
      this.renderer2.setStyle(this.el.nativeElement, style.name, style.value)
    );
  }
}
