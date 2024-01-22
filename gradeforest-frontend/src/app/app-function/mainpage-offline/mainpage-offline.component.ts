import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { MyAuthService } from '../../authentication/login/services/my-auth.service';
import { SaveModeService } from 'src/app/helpers/services/save-mode.service';
import { SaveMode } from 'interfaces/save-mode';
import { OfflineDataService } from 'src/app/helpers/services/offline-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page-offline',
  templateUrl: './main-page-offline.component.html',
  styleUrls: ['./main-page-offline.component.scss'],
})
export class MainPageOfflineComponent implements OnInit {
  breakpoint!: number;
  listName: any;

  constructor(
    public auth: AuthService,
    public myAuth: MyAuthService,
    public saveMode: SaveModeService,
    public OfflineDataService: OfflineDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.saveMode.setDataSaveMode(SaveMode.Offline)
    this.breakpoint = window.innerWidth <= 700 ? 1 : 2;
  }
  upload(event: Event) {

    let files = (event.target as HTMLInputElement).files
    if (files) {
      this.OfflineDataService.uploadData(files[0])
      window.location.reload();
    }

  }
  downloadFile(event: Event) {
    this.OfflineDataService.downloadData()
  }

  onResize(event: any) {
    this.breakpoint = event.target.innerWidth <= 700 ? 1 : 2;
  }
}
