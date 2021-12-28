import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {
  user: User | null | undefined;


  constructor(public auth: AuthService) { }

  getProfileEmail(myFunc: (arg0: string) => void){
    
    return this.auth.user$.pipe(
      take(1),
    ).subscribe((profile)=>{
      if (profile && profile.email){
        myFunc(profile.email)
      }else{
        console.error("couldn't get user profile or there were no emails attached to it")
      }
    })

  }

}
