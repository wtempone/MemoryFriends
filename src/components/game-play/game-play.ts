import { GameSession, Friend, Player, Card } from './../../providers/database/models/game-session';
import { AuthServiceProvider } from './../../providers/auth-service';
import { UserService } from './../../providers/database/services/user-service';
import { GameSessionService } from './../../providers/database/services/game-session-service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  inputs: ['gameSession:gameSession', 'currentPlayerIndex: currentPlayerIndex', 'gameSessionKey: gameSessionKey'],
  selector: 'game-play',
  templateUrl: 'game-play.html'
})
export class GamePlayComponent {
  @Output() done = new EventEmitter();

  friends: Friend[] = [];
  friendsPlaceHolder: Friend[] = [];
  selectedCards = []
  currentPlayerIndex: number;
  gameSession: GameSession;
  gameSessionKey: string;
  doneFired: boolean;
  constructor(
    public gameSessionSrvc: GameSessionService,
    public userSrvc: UserService,
    public authSrvc: AuthServiceProvider
  ) {
  }
  selectCard(card: Card) {

    setTimeout(() => {
      card.flipped = !card.flipped;
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/cards/${card.ind}`, card)
        .then(() => {
          let cardId: string;
          this.gameSession.cards.filter(x => x.flipped && !x.resolved).forEach((card: Card) => {
            if (cardId) {
              if (cardId == card.card.id) {
                this.resolveCards(this.gameSession.cards.filter(x => x.flipped && !x.resolved));
              } else {
                this.unFlipCards(this.gameSession.cards.filter(x => x.flipped && !x.resolved));
              }
            } else {
              cardId = card.card.id;
            }
          });
        })

    }, 1000);
  }

  resolveCards(cards: Card[]) {
    cards.forEach((card: Card) => {
      card.resolved = true;
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/cards/${card.ind}`, card)
    })
    let score: number = 0
    if (this.gameSession.players[this.currentPlayerIndex].score) {
      score = this.gameSession.players[this.currentPlayerIndex].score
    }
    score++
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/players/${this.currentPlayerIndex}/score`, score)
  }

  unFlipCards(cards: Card[]) {
    cards.forEach((card: Card) => {
      card.flipped = false;
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/cards/${card.ind}`, card)
    })
    this.changeTurn()
  }

  changeTurn(){
    if (this.currentPlayerIndex == 0) {
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/playerTurn`, 1)
    } else {
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/playerTurn`, 0)
    }
  }

}
