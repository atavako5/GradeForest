import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,public auth: AuthService) {
  }
  ngOnInit(): void {
  
  }


  login(){
    this.auth.loginWithRedirect({appState: { target: '/mainpage' }})
  }
}
