import { GameSession, Friend, Photo } from './../../providers/database/models/game-session';
import { AuthServiceProvider } from './../../providers/auth-service';
import { UserService } from './../../providers/database/services/user-service';
import { GameSessionService } from './../../providers/database/services/game-session-service';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  inputs: ['gameSession:gameSession', 'currentPlayerIndex: currentPlayerIndex', 'gameSessionKey: gameSessionKey'],
  selector: 'select-cards',
  templateUrl: 'select-cards.html'
})
export class SelectCardsComponent {
  @Output() done = new EventEmitter();

  friends: Friend[] = [];
  photos: Photo[] = [];
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
    if (!this.authSrvc.facebookCredential) {
      this.authSrvc.loadFacebookCredentials().then(() => {
        this.load();
      })
    } else {
      this.load();
    }
  }
  load() {
    this.userSrvc.loadFriends();
    this.friends = this.userSrvc.friends;
    
    // this.userSrvc.loadPhotos();
    // this.photos = this.userSrvc.photos;
  }

  cardSelected(card: Friend): boolean {
    let selected = false;
    this.gameSession.players.forEach(player => {
      if (player.cards) {
        player.cards.forEach(x => {
          if (x.id == card.id) {
            selected = true;
            return;
          }
        });
        if (selected) {
          return;
        }
      }
    })
    return selected;
  }

  select(card: Friend, select, index: number) {
    if (!(this.selectedCards.length < (this.gameSession.numOfCards.numCards / 4))) {
      card.selected = false;
      return;
    }

    if (this.cardSelected(card)) {
      this.friends.forEach(y => {
        if (y.id == card.id) {
          y.selected = true;
          return;
        }
      });
      return;
    }

    if (select) {
      let newCard: Friend = {
        id: card.id,
        name: card.name,
        picture: card.picture,
        selected: false
      };
      this.selectedCards.push(newCard);
      this.friends[index].selected = true;

      this.gameSessionSrvc.setAllPlayersCard(this.gameSessionKey, this.currentPlayerIndex, this.selectedCards);
    }
  }

  unSelect(card: Friend, cardIndex) {
    this.friends.forEach(x => {
      if (x.name == card.name) {
        x.selected = false;
        return;
      }
    });

    if (this.selectedCards.length > 1) {
      this.selectedCards.splice(cardIndex, 1);
    } else {
      this.selectedCards = [];
    }
    this.gameSessionSrvc.setAllPlayersCard(this.gameSessionKey, this.currentPlayerIndex, this.selectedCards);
  }

  doneButton() {
    this.doneFired = true;
    this.done.emit(true);
  }

}
