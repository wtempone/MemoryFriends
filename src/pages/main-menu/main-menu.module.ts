import { TranslateModule } from '@ngx-translate/core';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainMenuPage } from './main-menu';

@NgModule({
  declarations: [
    MainMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MainMenuPage),
    TranslateModule.forChild()
    
  ],
  exports: [
    MainMenuPage
  ]
})
export class MainMenuPageModule {}
