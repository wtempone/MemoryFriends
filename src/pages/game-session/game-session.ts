import { AuthServiceProvider } from './../../providers/auth-service';
import { GameSession } from './../../providers/database/database-providers';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GameSessionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-game-session',
  templateUrl: 'game-session.html',
})
export class GameSessionPage {
  gameSession: GameSession;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private authServiceProvider: AuthServiceProvider,
    private translate: TranslateService  
  ) {

    /* this.authServiceProvider.db
        .list('/game-sessiona/' + this.navParams.data)
        .map((gameSession) =>{ this.gameSession =  gameSession;});
        */
  }

  ionViewDidLoad() {
  }

}
