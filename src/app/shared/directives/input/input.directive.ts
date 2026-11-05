import { NgModule } from '@angular/core';
import { IconLeftDirective } from './icon-left.directive';
import { IconRightDirective } from './icon-right.directive';

@NgModule({
  imports: [IconLeftDirective, IconRightDirective],
  exports: [IconLeftDirective, IconRightDirective],
})
export class InputDirectivesModule {}
