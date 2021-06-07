import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbTooltipModule,
  NbUserModule
} from "@nebular/theme";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbInputModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
