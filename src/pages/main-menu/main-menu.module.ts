import { TranslateModule } from '@ngx-translate/core';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainMenuPage } from './main-menu';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MainMenuPage
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(MainMenuPage),
    TranslateModule.forChild()
  ],
  exports: [
    MainMenuPage
  ]
})
export class MainMenuPageModule {}
