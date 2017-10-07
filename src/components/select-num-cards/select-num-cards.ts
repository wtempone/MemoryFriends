import { AuthServiceProvider } from './../../providers/auth-service';
import { UserService } from './../../providers/database/services/user-service';
import { GameSessionService } from './../../providers/database/services/game-session-service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  inputs:['gameSession:gameSession'],
  selector: 'select-num-cards',
  templateUrl: 'select-num-cards.html'
})
export class SelectNumCardsComponent {
  friends = []
  @Output() selectNumCard = new EventEmitter();
  
  constructor(
    public gameSessionSrvc: GameSessionService,
    public userSrvc: UserService,
    public authSrvc: AuthServiceProvider
  ) {
    
  }

  set(numCard):void {
    this.selectNumCard.emit(numCard);
  }
}
