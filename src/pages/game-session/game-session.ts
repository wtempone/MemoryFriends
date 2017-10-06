import { AuthServiceProvider } from './../../providers/auth-service';
import { GameSession } from './../../providers/database/database-providers';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GameSessionService } from '../../providers/database/services/game-session-service';

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
    private translate: TranslateService,
    private gameSessionSrvc: GameSessionService
  ) {
    //this.gameSession = this.gameSessionSrvc.observe(this.navParams.data);
    this.gameSessionSrvc.observe('-KvnCTXGqmHNH5p85Vgx').subscribe(gameSession => {
      this.gameSession = gameSession;
      console.log(this.gameSession);
    });
  }

  ionViewDidLoad() {
  }

}
