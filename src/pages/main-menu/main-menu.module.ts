import { InviteUserCardComponent } from './../../components/invite-user-card/invite-user-card';
import { TranslateModule } from '@ngx-translate/core';

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainMenuPage } from './main-menu';

@NgModule({
  declarations: [
    MainMenuPage,
    InviteUserCardComponent
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
