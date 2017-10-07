import { LocalStorage } from './../providers/localstorage/localstorage';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { Items } from '../mocks/providers/items';
import { Settings } from '../providers/providers';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { MyApp } from './app.component';

// Configuration Firebase
import { FacebookModule } from 'ngx-facebook';
//Modulos Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthServiceProvider } from "../providers/auth-service";
import { Facebook } from "@ionic-native/facebook";
import { GameSessionService, UserService } from '../providers/database/database-providers';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyAh3n6hFmwk9d6ydUEr8RXf8bFSX36vH8E",
  authDomain: "memory-friends.firebaseapp.com",
  databaseURL: "https://memory-friends.firebaseio.com",
  projectId: "memory-friends",
  storageBucket: "memory-friends.appspot.com",
  messagingSenderId: "518522696281"
};


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {

  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, 
    AngularFireAuthModule,
    FacebookModule.forRoot()       
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    Items,
    User,
    Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthServiceProvider,
    Facebook,
    GameSessionService,
    UserService,
    AngularFireDatabase,
    LocalStorage 
  ]
})

export class AppModule { }
