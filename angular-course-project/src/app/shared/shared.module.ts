import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinner } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from '../directive/placeholder.directive';
import { DropdownDirective } from '../directive/dropdown.directive';
import { TestDirectiveDirective } from '../directive/test-directive.directive';
import { UnlessDirective } from '../directive/unless.directive';
import { ShortenPipe } from '../pipes/shorten.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { ReversePipe } from '../pipes/reverse.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TestDirectiveDirective,
    AlertComponent,
    LoadingSpinner,
    PlaceholderDirective,
    DropdownDirective,
    UnlessDirective,
    ShortenPipe,
    FilterPipe,
    ReversePipe,
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinner,
    PlaceholderDirective,
    DropdownDirective,
    TestDirectiveDirective,
    UnlessDirective,
    ShortenPipe,
    FilterPipe,
    ReversePipe,
    CommonModule,
  ],
})
export class SharedModule {}
