import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { InviteUserCardComponent } from './invite-user-card/invite-user-card';
import { GamePlayComponent } from './game-play/game-play';
import { SelectCardsComponent } from './select-cards/select-cards';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { FlashCardComponent } from './flash-card/flash-card';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble';
import { PlayerCardComponent } from './player-card/player-card';
import { SelectNumCardsComponent } from './select-num-cards/select-num-cards';
import { SimpleUserCardComponent } from './simple-user-card/simple-user-card';
import { FlashUserCardComponent } from './flash-user-card/flash-user-card';
import { ProgressBarComponent } from './progress-bar/progress-bar';
import { EndGameComponent } from './end-game/end-game';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [FlashCardComponent,
    ChatBubbleComponent,
    PlayerCardComponent,
    SelectCardsComponent,
    SelectNumCardsComponent,
    SimpleUserCardComponent,
    FlashUserCardComponent,
    GamePlayComponent,
    ProgressBarComponent,
    InviteUserCardComponent,
    EndGameComponent
    ],
	imports: [CommonModule,IonicPageModule,TranslateModule.forChild()],
	exports: [FlashCardComponent,
    ChatBubbleComponent,
    PlayerCardComponent,
    SelectCardsComponent,
    SelectNumCardsComponent,
    SimpleUserCardComponent,
    FlashUserCardComponent,
    GamePlayComponent,
    ProgressBarComponent,
    InviteUserCardComponent,
    EndGameComponent
]
})
export class ComponentsModule {}
