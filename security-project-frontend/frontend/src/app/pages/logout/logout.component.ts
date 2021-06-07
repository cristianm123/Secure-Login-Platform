import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { APP_NAME } from "../../utils/app.titles";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  title = APP_NAME;
  icon: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
    this.authService.logOut();
  }

  goToLogin() {
    return this.router.navigateByUrl('');
  }
}
