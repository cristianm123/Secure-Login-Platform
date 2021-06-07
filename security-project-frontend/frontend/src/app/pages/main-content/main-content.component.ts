import { Component, OnInit} from '@angular/core';
import { MENU_ITEMS, PROFILE_ITEMS } from "../../utils/items.menu";
import { NbSidebarService } from "@nebular/theme";
import { APP_NAME } from "../../utils/app.titles";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent {

  menu = MENU_ITEMS;
  title = APP_NAME;
  items = PROFILE_ITEMS;
  icon: string;
  username: string;
  roles: string[];

  constructor(
    private sidebarService: NbSidebarService,
    private tokenService: UserService,
  ) {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
    this.username = tokenService.getUserName();
    this.roles = tokenService.getAuthorities();
  }

  toggle(): void {
    this.sidebarService.toggle(true);
  }
}
