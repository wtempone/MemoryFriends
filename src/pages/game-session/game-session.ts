import { NumCards, Friend, Player } from './../../providers/database/models/game-session';
import { AuthServiceProvider } from './../../providers/auth-service';
import { GameSession, UserService } from './../../providers/database/database-providers';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { GameSessionService } from '../../providers/database/services/game-session-service';
import { Message, Steps, Card } from '../../providers/database/models/game-session';

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
  numCards:NumCards;
  messages:Message[] =[]
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
      console.log(this.gameSession);
      if (!this.currentPlayerIndex) {
        this.currentPlayerIndex = this.gameSession.players.findIndex( x => x.user.facebookId == this.userSrvc.currentUser.facebookId);
        //this.currentPlayerIndex = 0;
      }
      if (!this.gameSessionKey) {
        let parseKey: any = this.gameSession;
        this.gameSessionKey = parseKey.$key;
      }
      this.gameSessionSrvc.startListenerMenssages(this.gameSessionKey, this.currentPlayerIndex);
    });
  }

  gameMenu() {
    this.menuCtrl.toggle('messages');
  }

  sendMessage(text) {
    if (!text) return;
    let id = 0;
    if (this.gameSession.messages){
      id = this.gameSession.messages.length;
    }
    this.gameSessionSrvc.sendMessage(this.gameSessionKey,id,
      <Message>{
        id: id,
        playerIndex: this.currentPlayerIndex,
        text: text,
        time: Date.now().toString()
      }
    ).catch(error => this.handleError(error))
  }
  setNumCard(numCards:NumCards){
    this.numCards = numCards;
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/numOfCards`,numCards);
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/step`, Steps.SelectCard);  
  }
  playerReady($event){
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/players/${this.currentPlayerIndex}/ready`,true)
      .then(() => {
        if (this.gameSession.players[0].ready && this.gameSession.players[1].ready) {
          this.startGame();
        }
      });
  }

  startGame(){
    let friendArray: Friend[] = [];
    this.gameSession.players.forEach((player: Player) => {
      player.cards.forEach((friend: Friend) => {
        friendArray.push(friend);
      })
    })
    let indexArray:number[] =[];
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

    let cards:Card[] = [];
    index = 0;
    for (const item of indexArray) {
      let card:Card = {
        ind: index,
        card: friendArray[item]
      }
      cards.push(card);
      index++;
    }

    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/cards`, cards).then(() => {
      this.gameSessionSrvc.setValue(`${this.gameSessionKey}/step`, Steps.Game);  
    });  

    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/playerTurn`, 0)    
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
  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }
}
