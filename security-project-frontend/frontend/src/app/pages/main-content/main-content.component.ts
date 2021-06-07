import { Component, OnInit} from '@angular/core';
import { MENU_ITEMS, PROFILE_ITEMS } from "../../utils/items.menu";
import {NbSidebarService, NbToastrService} from "@nebular/theme";
import { APP_NAME } from "../../utils/app.titles";
import { ThemeService } from "../../services/theme.service";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit {

  menu = MENU_ITEMS;
  title = APP_NAME;
  items = PROFILE_ITEMS;
  icon: string;
  username: string;
  roles: string[];

  constructor(
    private sidebarService: NbSidebarService,
    private themeService: ThemeService,
    private tokenService: UserService,
    private router: Router,
    private toastService: NbToastrService,
  ) {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
    this.username = tokenService.getUserName();
    this.roles = tokenService.getAuthorities();
  }

  ngOnInit(): void {
    this.showMessageDialog();
  }

  showMessageDialog() {
    const roles = this.tokenService.getAuthorities();
  }

  toggle(): void {
    this.sidebarService.toggle(true);
  }

  switchMode() {
    this.themeService.switchTheme();
    this.icon = localStorage.getItem('icon');
  }
}
