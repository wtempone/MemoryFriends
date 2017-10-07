import { SelectCardsComponent } from './select-cards/select-cards';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { FlashCardComponent } from './flash-card/flash-card';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble';
import { PlayerCardComponent } from './player-card/player-card';
import { SelectNumCardsComponent } from './select-num-cards/select-num-cards';
import { SimpleUserCardComponent } from './simple-user-card/simple-user-card';
@NgModule({
	declarations: [FlashCardComponent,
    ChatBubbleComponent,
    PlayerCardComponent,
    SelectCardsComponent,
    SelectNumCardsComponent,
    SimpleUserCardComponent],
	imports: [TranslateModule.forChild()],
	exports: [FlashCardComponent,
    ChatBubbleComponent,
    PlayerCardComponent,
    SelectCardsComponent,
    SelectNumCardsComponent,
    SimpleUserCardComponent]
})
export class ComponentsModule {}
