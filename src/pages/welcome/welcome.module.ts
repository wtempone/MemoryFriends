import { ComponentsModule } from './../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomePage } from './welcome';

@NgModule({
  declarations: [
    WelcomePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(WelcomePage),
    TranslateModule.forChild()    
    
  ],
})
export class WelcomePageModule {}
