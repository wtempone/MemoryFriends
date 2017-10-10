import { Friend } from './../../providers/database/models/game-session';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  inputs: ['user:user','disabled:disabled'],
  selector: 'invite-user-card',
  templateUrl: 'invite-user-card.html',
})
export class InviteUserCardComponent {
  @Output() selectCard = new EventEmitter();
  user: Friend;
  disabled: boolean;
  constructor() {

  }
  select() {
    if (this.disabled) return;
    this.selectCard.emit(this.user.selected);    
  }
}
