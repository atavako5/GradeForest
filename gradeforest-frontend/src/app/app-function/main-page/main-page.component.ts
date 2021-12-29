import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from 'interfaces/status';
import { StatusService } from '../../api/services/status.service';
import { AuthService, User } from '@auth0/auth0-angular';
import { MyAuthService } from '../../authentication/login/services/my-auth.service';
import { UserService } from '../../api/services/user.service';
import { DefaultGPARules } from 'src/app/helpers/default-gpa-rules';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  breakpoint!: number;
  listName: any;

  constructor(
    private router: Router,
    private statusService: StatusService,
    public auth: AuthService,
    public myAuth: MyAuthService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.getStatus();
    this.breakpoint = window.innerWidth <= 700 ? 1 : 2;
    this.myAuth.getProfileEmail((email) => {
      this.userService
        .addUser({ _id: email, GPARules: new DefaultGPARules().DefaultRules })
        .subscribe();
    });
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
  }
  status!: Status;

  getStatus(): void {
    this.statusService.getStatus().subscribe((status) => {
      this.status = status;
    });
  }

  logout(): void {
    this.auth.logout({ returnTo: document.location.origin });
  }
}
