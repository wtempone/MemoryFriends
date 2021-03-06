import { NumCards, Friend, Player } from './../../providers/database/models/game-session';
import { AuthServiceProvider } from './../../providers/auth-service';
import { GameSession, UserService } from './../../providers/database/database-providers';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { GameSessionService } from '../../providers/database/services/game-session-service';
import { Message, Steps, Card, Turn } from '../../providers/database/models/game-session';

@IonicPage()
@Component({
  selector: 'page-game-session',
  templateUrl: 'game-session.html',
})
export class GameSessionPage {

  message
  gameSession: GameSession;
  currentPlayerIndex: number;
  gameSessionKey: string;
  numCards: NumCards;
  messages: Message[] = [];
  interval;
  timeOut;
  progress: number;
  waiting: boolean;
  turns: Turn[] = [];
  started: boolean = false;
  cardsPlaceHolder: Friend[] = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    private translate: TranslateService,
    private gameSessionSrvc: GameSessionService,
    private menuCtrl: MenuController,
    public userSrvc: UserService,
    private toast: ToastController
  ) {
    this.gameSessionSrvc.observe(this.navParams.data).subscribe(gameSession => {
      //this.gameSessionSrvc.observe('-KvxiBCiyftD646SKypR').subscribe(gameSession => {
      this.gameSession = gameSession;
      //console.log(this.gameSession);
      if (!this.currentPlayerIndex) {
        this.currentPlayerIndex = this.gameSession.players.findIndex(x => x.user.facebookId == this.userSrvc.currentUser.facebookId);
        //this.currentPlayerIndex = 0;
      }
      if (!this.gameSessionKey) {
        let parseKey: any = this.gameSession;
        this.gameSessionKey = parseKey.$key;
      }
      this.gameSessionSrvc.startListenerMenssages(this.gameSessionKey, this.currentPlayerIndex);
      this.stepChange()
    });

  }

  stepChange() {
    const path = `${this.gameSessionSrvc.basePath}/${this.gameSessionKey}/step`;
    this.gameSessionSrvc.db.object(path).$ref.on('value', (step) => {
      if (step.val() == Steps.Game) {
        if (!this.started) {
          this.startGame()
        }
      } else {
        this.stopGame();
      }
    });
  }

  gameMenu() {
    this.menuCtrl.toggle('messages');
  }

  sendMessage(text) {
    if (!text) return;
    let id = 0;
    if (this.gameSession.messages) {
      id = this.gameSession.messages.length;
    }
    this.gameSessionSrvc.sendMessage(this.gameSessionKey, id,
      <Message>{
        id: id,
        playerIndex: this.currentPlayerIndex,
        text: text,
        time: Date.now().toString()
      }
    ).catch(error => this.handleError(error))
  }

  setNumCard(numCards: NumCards) {
    this.numCards = numCards;
    this.cardsPlaceHolder = [];
    for (var i = 0; i < (numCards.numCards / 4); i++) {
      this.cardsPlaceHolder.push({
        id: '0',
        name: ' ',
        picture: ' '
      })

    }

    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/cardsPlaceHolder`, this.cardsPlaceHolder);
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/numOfCards`, numCards);
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/step`, Steps.SelectCard);
  }

  playerReady($event) {
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/players/${this.currentPlayerIndex}/ready`, true)
      .then(() => {
        if (this.gameSession.players[0].ready && this.gameSession.players[1].ready) {
          this.restartGame();
        }
      });
  }

  stopGame() {
    this.started = false;
    this.listernerChangeTurn(false);
    this.startTimerPlay(false);
  }

  startGame() {
    this.started = true;
    let friendArray: Friend[] = [];
    this.gameSession.players.forEach((player: Player) => {
      player.cards.forEach((friend: Friend) => {
        friendArray.push(friend);
      })
    })
    let indexArray: number[] = [];
    let index = 0;

    for (const item of friendArray) {
      indexArray.push(index)
      index++;
    }
    index = 0;
    for (const item of friendArray) {
      indexArray.push(index)
      index++;
    }

    this.shuffle(indexArray);

    let cards: Card[] = [];
    index = 0;
    for (const item of indexArray) {
      let card: Card = {
        ind: index,
        card: friendArray[item]
      }
      cards.push(card);
      index++;
    }
    // passa a  vez para pardedor
    if (this.gameSession.playerTurn == 0 && this.gameSession.players[0].score > this.gameSession.players[1].score) {
      this.changePlayer();
    } else  if (this.gameSession.playerTurn == 1 && this.gameSession.players[0].score < this.gameSession.players[1].score) {
      this.changePlayer();
    }

    this.turns = [];
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/players/0/score`, 0);
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/players/1/score`, 0);
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/cards`, cards);

    this.gameSessionSrvc.removeValue(`${this.gameSessionKey}/turn`);

    this.startTimerPlay(true);
    this.listernerChangeTurn(true);
  }

  restartGame() {
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/step`, Steps.Game);
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
    }
  }

  listernerChangeTurn(on: boolean) {
    const path = `${this.gameSessionSrvc.basePath}/${this.gameSessionKey}/turn`;
    if (on) {
      this.gameSessionSrvc.db.object(path).$ref.on('value', (res) => {
        let turn: Turn = res.val();
        if (!turn) return;
        let exists = this.turns.filter(x => x.id == turn.id).length > 0;
        //console.log(`listener ==> turn.val(): ${turn.id} exists: ${exists} controle interno turn:${this.turns}`);
        if (exists) return;
        this.progress = 100;
        this.turns.push(turn);
        if (this.currentPlayerIndex == this.gameSession.playerTurn) {
          if (!turn.hit) {
            this.changePlayer();
          } else {
            if (this.checkEndGame()) {
              this.endGame();
            }
          }
        }
      });
    } else {
      this.gameSessionSrvc.db.object(path).$ref.off('value');
    }
  }

  checkEndGame(): boolean {
    return (this.gameSession.players[0].score + this.gameSession.players[1].score)
      == (this.gameSession.numOfCards.numCards / 2);
  }

  endGame() {
    if (this.gameSession.players[0].score > this.gameSession.players[1].score)
    {
      let wins:number = 0;
      if (this.gameSession.players[0].wins) {
        wins = this.gameSession.players[0].wins;
      }
      wins++
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/players/0/wins`, wins);      
    }

    if (this.gameSession.players[0].score < this.gameSession.players[1].score)
    {
      let wins:number = 0;
      if (this.gameSession.players[1].wins) {
        wins = this.gameSession.players[1].wins;
      }
      wins++
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/players/1/wins`, wins);      
    }
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/step`, Steps.EndGame);
  }

  newGame() {
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/step`, Steps.ConfigNumCards);
  }
  exit() {
    this.gameSessionSrvc.delete(this.gameSessionKey);
  }

  startTimerPlay(on) {
    this.restartTimePlay();
    if (on) {
      //console.log('start time');
      this.interval = setInterval(() => {
        if (this.progress >= 0.000) {
          this.progress -= 0.3;
          if (this.progress < 0.000) {
            //console.log(this.progress);
            this.changeTurn(false);
          }
        }
      }, 30)
    } else {
      if (this.interval)
        clearInterval(this.interval);
    }
  }

  restartTimePlay() {
    this.progress = 100;
  }

  changeTurn(hit: boolean) {
    //console.log('change turn')
    let nextId: number = 0;
    if (this.gameSession.turn) {
      nextId = this.gameSession.turn.id + 1;
    }
    let nextTurn: Turn = {
      id: nextId,
      hit: hit
    }
    this.unFlipCards(this.gameSession.cards.filter(x => x.flipped && !x.resolved));
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/turn`, nextTurn);
  }

  changePlayer() {
    //console.log('changed Player');   
    if (this.currentPlayerIndex == 0) {
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/playerTurn`, 1);
    } else {
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/playerTurn`, 0);
    }
  }

  unFlipCards(cards: Card[]) {
    cards.forEach((card: Card) => {
      card.flipped = false;
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/cards/${card.ind}`, card)
    })
  }

  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }
}
