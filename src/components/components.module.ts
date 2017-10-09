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
@NgModule({
	declarations: [FlashCardComponent,
    ChatBubbleComponent,
    PlayerCardComponent,
    SelectCardsComponent,
    SelectNumCardsComponent,
    SimpleUserCardComponent,
    GamePlayComponent,
    ProgressBarComponent
    ],
	imports: [TranslateModule.forChild()],
	exports: [FlashCardComponent,
    ChatBubbleComponent,
    PlayerCardComponent,
    SelectCardsComponent,
    SelectNumCardsComponent,
    SimpleUserCardComponent,
    FlashUserCardComponent,
    GamePlayComponent,
    ProgressBarComponent
]
})
export class ComponentsModule {}
