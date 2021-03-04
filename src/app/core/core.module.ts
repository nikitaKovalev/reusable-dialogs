import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { DialogWrapperComponent } from './components';
import { DialogService } from './services';



@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  declarations: [
    DialogWrapperComponent,
  ],
  providers: [
    DialogService,
  ]
})
export class CoreModule { }
