import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameSessionPage } from './game-session';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GameSessionPage  
    ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GameSessionPage),
    TranslateModule.forChild()    
  ],
  exports: [
    GameSessionPage
  ]
})
export class GameSessionPageModule {}
