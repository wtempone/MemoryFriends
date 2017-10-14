import { User } from './../../providers/database/models/user';
import { Friend, Photo } from './../../providers/database/models/game-session';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  inputs: ['user:user','disabled:disabled'],
  selector: 'simple-user-card',
  templateUrl: 'simple-user-card.html',
})
export class SimpleUserCardComponent {
  @Output() selectCard = new EventEmitter();
  user: Friend;
  disabled: boolean;
  constructor() {

  }
  select() {
    if (this.user.selected || this.disabled) return;
    this.user.selected = !this.user.selected;
    this.selectCard.emit(this.user.selected);    
  }
}
