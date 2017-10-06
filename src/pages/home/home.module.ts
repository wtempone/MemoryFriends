import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { FlashCardComponent } from '../../components/flash-card/flash-card';

@NgModule({
  declarations: [
    HomePage,
    FlashCardComponent    
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild()    
  ],
})
export class HomePageModule {}
