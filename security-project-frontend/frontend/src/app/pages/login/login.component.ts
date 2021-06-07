import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { APP_NAME } from "../../utils/app.titles";
import { ThemeService } from "../../services/theme.service";
import { UserLogin } from "../../models/user-login";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { catchError, first, tap } from "rxjs/operators";
import { of } from "rxjs";
import { JwtDTO } from "../../models/jwt-dto";
import { NbToastrService } from "@nebular/theme";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  title = APP_NAME;
  icon: string;
  userLogin: UserLogin;
  onLoginError: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private tokenService: UserService,
    private authService: AuthService,
    private toastService: NbToastrService,
  ) {
  }

  ngOnInit(): void {
    this.icon = localStorage.getItem('theme') ? localStorage.getItem('icon') : 'moon-outline';
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login() {
    this.onLoginError = false;
    const { user, password } = this.form.value
    this.userLogin = new UserLogin(user, password);
    this.authService.logIn(this.userLogin)
      .pipe(
        tap((response: JwtDTO) => {
          this.tokenService.setToken(response.token);
          this.tokenService.setUserName(response.username);
          this.tokenService.setAuthorities(response.authority);
          response.clientId ? this.tokenService.setClientId(response.clientId) : of(null);
          response.contractId ? this.tokenService.setContractId(response.contractId) : of(null);
          return this.router.navigate(['']);
        }),
        catchError((err) => {
          this.onLoginError = true;
          this.toastService.show('Error en las credenciales', APP_NAME, { status: 'danger' });
          return of(err);
        }),
        first()
      )
      .subscribe();
  }

  switchMode() {
    this.themeService.switchTheme();
    this.icon = localStorage.getItem('icon');
  }
}
