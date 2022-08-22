import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export type IValue = string | number | null;

@Component({
  selector: 'app-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownSelectComponent,
      multi: true
    }
  ]
})
export class DropdownSelectComponent implements ControlValueAccessor {
  @HostListener('document:click', ['$event'])
  clickOutHandler(event: Event) {
    if (!this.elemRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  isOpen: boolean;
  value: IValue;
  private onChangeFn: Function;
  private onTouchFn: Function;

  @Input() placeholder: string;
  @Input() options: string[] | null;

  constructor(private elemRef: ElementRef) {
    this.value = null;
    this.options = [];
    this.isOpen = false;
    this.placeholder = '';
    this.onChangeFn = (_: any) => {};
    this.onTouchFn = () => {};
  }

  writeValue(newValue: IValue): void {
    this.setSelected(newValue);
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }

  setSelected(selected: IValue) {
    this.value = selected;
    this.onChangeFn(selected);
  }
}
