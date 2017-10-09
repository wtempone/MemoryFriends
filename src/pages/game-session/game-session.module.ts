import { GamePlayComponent } from './../../components/game-play/game-play';
import { FlashCardComponent } from './../../components/flash-card/flash-card';
import { SimpleUserCardComponent } from './../../components/simple-user-card/simple-user-card';
import { SelectCardsComponent } from './../../components/select-cards/select-cards';
import { SelectNumCardsComponent } from './../../components/select-num-cards/select-num-cards';
import { PlayerCardComponent } from './../../components/player-card/player-card';
import { ChatBubbleComponent } from './../../components/chat-bubble/chat-bubble';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameSessionPage } from './game-session';
import { TranslateModule } from '@ngx-translate/core';
import { FlashUserCardComponent } from '../../components/flash-user-card/flash-user-card';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';

@NgModule({
  declarations: [
    GameSessionPage,
    ChatBubbleComponent,
    PlayerCardComponent,
    SelectNumCardsComponent,
    SelectCardsComponent,
    SimpleUserCardComponent,
    FlashUserCardComponent,
    FlashCardComponent,
    GamePlayComponent,
    ProgressBarComponent    
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
