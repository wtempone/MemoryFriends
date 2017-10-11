import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    ComponentsModule,    
    IonicPageModule.forChild(HomePage),
    TranslateModule.forChild()    
  ],
})
export class HomePageModule {}
