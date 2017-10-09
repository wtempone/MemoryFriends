import { GameSessionService } from './../../providers/database/services/game-session-service';
import { Friend, Card } from './../../providers/database/models/game-session';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  inputs: ['card:card','disabled:disabled'],
  selector: 'flash-user-card',
  templateUrl: 'flash-user-card.html',
})
export class FlashUserCardComponent {
  @Output() selectCard = new EventEmitter();
  card: Card;
  disabled: boolean;
  placeholder: Friend ={
    id:'',
    name: '',
    picture: ''
  };
  constructor(
    public gameSessionSrvc:GameSessionService
  ) {

  }
  select() {
    if (this.card.flipped || this.card.resolved || this.disabled) return;
    this.selectCard.emit(this.card);
  }
}
