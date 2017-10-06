import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameSessionPage } from './game-session';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GameSessionPage,
  ],
  imports: [
    IonicPageModule.forChild(GameSessionPage),
    TranslateModule.forChild()    
  ],
  exports: [
    GameSessionPage
  ]
})
export class GameSessionPageModule {}
