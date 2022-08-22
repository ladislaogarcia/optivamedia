import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppInfiniteScrollDirective } from './directives/app-infinite-scroll.directive';
import { Page404Component } from './components/page404/page404.component';
import { FilterArrayByPropertyValuePipe } from './filters/filter-array-by-property-value.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownSelectComponent } from './components/dropdown-select/dropdown-select.component';
import { SpinnerModule } from './modules/spinner/spinner.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppInfiniteScrollDirective,
    Page404Component,
    FilterArrayByPropertyValuePipe,
    DropdownSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SpinnerModule,
    RouterModule
  ],
  exports: [
    AppInfiniteScrollDirective,
    Page404Component,
    FilterArrayByPropertyValuePipe,
    DropdownSelectComponent,
    ReactiveFormsModule,
    SpinnerModule,
    RouterModule
  ]
})
export class SharedModule {}
