import { SelectCardsComponent } from './../../components/select-cards/select-cards';
import { SelectNumCardsComponent } from './../../components/select-num-cards/select-num-cards';
import { PlayerCardComponent } from './../../components/player-card/player-card';
import { ChatBubbleComponent } from './../../components/chat-bubble/chat-bubble';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameSessionPage } from './game-session';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    GameSessionPage,
    ChatBubbleComponent,
    PlayerCardComponent,
    SelectNumCardsComponent,
    SelectCardsComponent
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
