import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { NbToastrService } from "@nebular/theme";
import {switchMap, tap} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
  form: FormGroup;

  constructor(
    private userService: UserService,
    private message: NbToastrService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

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
        switchMap(() => this.userService.getAllUsers()),
        tap((users) => this.users = users),
        tap(() => this.message.success('Operación realizada correctamente')),
      )
      .subscribe();
  }

  changePassword() {
    this.userService.changePassword(this.form.value.password)
      .pipe(
        tap(() => this.message.success('Operación realizada correctamente')),
      )
      .subscribe();
  }
}
