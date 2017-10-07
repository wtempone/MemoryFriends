import { NumCards } from './../../providers/database/models/game-session';
import { AuthServiceProvider } from './../../providers/auth-service';
import { GameSession, UserService } from './../../providers/database/database-providers';
import { TranslateService } from '@ngx-translate/core';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { GameSessionService } from '../../providers/database/services/game-session-service';
import { Message, Steps } from '../../providers/database/models/game-session';

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    private translate: TranslateService,
    private gameSessionSrvc: GameSessionService,
    private menuCtrl: MenuController,
    public userSrvc: UserService,
    private toast: ToastController
  ) {
    //this.gameSessionSrvc.observe(this.navParams.data).subscribe(gameSession => {
    this.gameSessionSrvc.observe('-KvrQTgKLzRXqlZWjp1F').subscribe(gameSession => {
      this.gameSession = gameSession;
      console.log(this.gameSession);
      if (!this.currentPlayerIndex) {
        //this.indexPlayer = this.gameSession.players.findIndex( x => x.user.facebookId == this.userSrvc.currentUser.facebookId);
        this.currentPlayerIndex = 0;
      }
      if (!this.gameSessionKey) {
        let parseKey: any = this.gameSession;
        this.gameSessionKey = parseKey.$key;
      }
      this.gameSessionSrvc.startListenerMenssages(this.gameSessionKey, this.currentPlayerIndex);
    });
  }

  gameMenu() {
    console.log('menu')
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
        playerIndex: this.currentPlayerIndex,
        text: text,
        time: Date.now().toString()
      }
    ).catch(error => this.handleError(error))
  }
  setNumCard(numCards:NumCards){
    this.numCards = numCards;
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/numOfCards`,numCards.numCards);
    this.gameSessionSrvc.setValue(`${this.gameSessionKey}/step`, Steps.SelectCard);    
  }
  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }
}
