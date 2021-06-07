import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { NbToastrService } from "@nebular/theme";
import { tap } from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  theme: string;
  loading: boolean;
  roles: string[];
  lastLoginDate: Date;
  username: string;
  users: string[];

  constructor(
    private userService: UserService,
    private message: NbToastrService,
  ) { }

  async ngOnInit() {
    this.roles = this.userService.getAuthorities();
    this.username = this.userService.getUserName();
    this.lastLoginDate = this.roles.includes('regular') ? await this.userService.getLastLoginDate().toPromise() : null;
    this.users = this.roles.includes('admin') ? await this.userService.getAllUsers().toPromise() : null;
  }

  blankPassword(user: string) {
    this.userService.blankPassword(user)
      .pipe(
        tap(() => this.message.success('Operación realizada correctamente')),
      )
      .subscribe();
  }

  removeUser(user: string) {
    this.userService.deleteUser(user)
      .pipe(
        tap(() => this.message.success('Operación realizada correctamente')),
      )
      .subscribe();
  }
}
