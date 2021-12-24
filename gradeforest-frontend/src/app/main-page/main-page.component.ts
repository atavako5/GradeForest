import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Status } from 'interfaces/status';
import { StatusService } from '../shared/status.service';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {


  constructor(private router: Router,
    public socialAuthServive: SocialAuthService,
    private statusService: StatusService) {
  } 
  
  status!: Status;

  ngOnInit(): void {
    this.getStatus()
  }

  getStatus(): void{
    this.statusService.getStatus().subscribe(status => { this.status = status})
  }

  logout(): void {
    this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
  }
}
