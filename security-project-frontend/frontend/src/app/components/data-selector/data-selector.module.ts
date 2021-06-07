import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSelectorComponent } from './data-selector.component';
import {NbSelectModule, NbSpinnerModule, NbTooltipModule} from "@nebular/theme";



@NgModule({
  declarations: [DataSelectorComponent],
  exports: [
    DataSelectorComponent
  ],
  imports: [
    CommonModule,
    NbSelectModule,
    NbTooltipModule,
    NbSpinnerModule
  ]
})
export class DataSelectorModule { }
