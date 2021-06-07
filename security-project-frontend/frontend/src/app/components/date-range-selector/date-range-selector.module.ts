import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeSelectorComponent } from './date-range-selector.component';
import {NbDatepickerModule, NbInputModule, NbSpinnerModule, NbTooltipModule} from "@nebular/theme";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [DateRangeSelectorComponent],
  exports: [
    DateRangeSelectorComponent
  ],
  imports: [
    CommonModule,
    NbDatepickerModule,
    NbInputModule,
    FormsModule,
    NbTooltipModule,
    NbSpinnerModule
  ]
})
export class DateRangeSelectorModule { }
