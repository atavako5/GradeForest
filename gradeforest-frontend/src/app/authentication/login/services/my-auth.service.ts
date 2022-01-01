import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { SaveMode } from 'interfaces/save-mode';
import { take } from 'rxjs/operators';
import { SaveModeService } from 'src/app/helpers/services/save-mode.service';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {
  user: User | null | undefined;


  constructor(public auth: AuthService, private saveModeService: SaveModeService) { }

  getProfileEmail(myFunc: (arg0: string) => void) {

    this.saveModeService.saveMode.subscribe((saveMode) => {
      if (saveMode === SaveMode.Offline) {
        return myFunc("offline-user")
      } else if (saveMode === SaveMode.MyCloud) {
        return this.auth.user$.pipe(
          take(1),
        ).subscribe((profile) => {
          if (profile && profile.email) {
            myFunc(profile.email)
          } else {
            console.error("couldn't get user profile or there were no emails attached to it")
          }
        })
      }
    })





  }

}
