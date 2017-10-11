import { GameSession, Friend, Player, Card } from './../../providers/database/models/game-session';
import { AuthServiceProvider } from './../../providers/auth-service';
import { UserService } from './../../providers/database/services/user-service';
import { GameSessionService } from './../../providers/database/services/game-session-service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  inputs: ['gameSession:gameSession', 'currentPlayerIndex: currentPlayerIndex', 'gameSessionKey: gameSessionKey'],
  selector: 'end-game',
  templateUrl: 'end-game.html'
})
export class EndGameComponent {
  @Output() newGame = new EventEmitter();
  @Output() exitGame = new EventEmitter();
  @Output() restartGame = new EventEmitter();
  
  currentPlayerIndex: number;
  gameSession: GameSession;
  gameSessionKey: string;

  constructor(
    public gameSessionSrvc: GameSessionService,
    public userSrvc: UserService,
    public authSrvc: AuthServiceProvider
  ) {
  }
  selectCards(){
    this.newGame.emit();
  }

  exit(){
    this.exitGame.emit();
  }

  restart(){
    this.restartGame.emit();
  }
}
