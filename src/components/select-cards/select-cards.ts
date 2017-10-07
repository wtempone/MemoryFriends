import { AuthServiceProvider } from './../../providers/auth-service';
import { UserService } from './../../providers/database/services/user-service';
import { GameSessionService } from './../../providers/database/services/game-session-service';
import { Component } from '@angular/core';

@Component({
  inputs:['gameSession:gameSession'],
  selector: 'select-cards',
  templateUrl: 'select-cards.html'
})
export class SelectCardsComponent {
  friends = []
  constructor(
    public gameSessionSrvc: GameSessionService,
    public userSrvc: UserService,
    public authSrvc: AuthServiceProvider
  ) {
    if (!this.authSrvc.facebookCredential) {
      this.authSrvc.loadFacebookCredentials().then(() => {
        this.authSrvc.getFriends().then((res: any) => {
          let friends = res.data;
          friends.forEach(friend =>{
            this.authSrvc.getUser(friend.id).then(user => this.friends.push(user))
          })
        })
      })
    }
  }

}
