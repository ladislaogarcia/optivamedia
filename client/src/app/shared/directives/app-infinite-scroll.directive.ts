import { Directive, ElementRef, OnInit, Output, Renderer2, EventEmitter } from '@angular/core';
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
    fromEvent(this.el.nativeElement, 'scroll').subscribe((data: any): void => {
      const { scrollTop }: any = (data as Event).target;
      const scrollDownMax: number = this.getScrollDownMax(data);
      scrollTop === scrollDownMax && this.scrolled.emit();
    });
  }

  private getScrollDownMax(elem: Event): number {
    const { scrollTop, offsetHeight, scrollTopMax }: any = (elem as Event).target;
    return scrollTopMax || scrollTop + offsetHeight;
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
