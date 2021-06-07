import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentRoutingModule } from './main-content.routing.module';
import { MainContentComponent } from './main-content.component';
import {
  NbButtonModule,
  NbCardModule, NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule, NbTooltipModule, NbUserModule
} from "@nebular/theme";
import { DataSelectorModule } from "../../components/data-selector/data-selector.module";

@NgModule({
  declarations: [MainContentComponent],
  imports: [
    CommonModule,
    MainContentRoutingModule,
    NbCardModule,
    NbLayoutModule,
    NbMenuModule,
    NbSidebarModule,
    NbIconModule,
    NbButtonModule,
    NbUserModule,
    NbContextMenuModule,
    NbTooltipModule,
    DataSelectorModule,
  ],
})

export class MainContentModule {
}
