import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {UserDto} from "../../models/user-dto";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  theme: string;
  loading: boolean;
  roles: string[];
  lastLoginDate: string;
  username: string;
  users: string[];

  constructor(
    private userService: UserService,
  ) { }

  async ngOnInit() {
    this.roles = this.userService.getAuthorities();
    this.username = this.userService.getUserName();
    this.lastLoginDate = this.roles.includes('regular') ? await this.userService.getLastLoginDate().toPromise() : null;
    this.users = this.roles.includes('admin') ? await this.userService.getAllUsers().toPromise() : null;
  }
}
