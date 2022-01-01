import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) {
  }
  ngOnInit(): void {

  }

  offlineUse() {
    this.router.navigate(["/main-page-offline"])
  }
  login() {
    this.auth.loginWithRedirect({ appState: { target: '/mainpage' } })
  }
}
