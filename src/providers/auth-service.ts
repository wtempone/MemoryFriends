import { UserService } from './database/services/users';
//import { User } from './database/models/user';
import { Platform, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook'

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class AuthServiceProvider {
  facebookCredential: any = null;
  facebookUser: any = null;

  constructor(
    public afAuth: AngularFireAuth,
    private platform: Platform,
    private facebook: Facebook,
    private toastController: ToastController,
    private http: Http,
    public userService: UserService
    ) { }

  signInWithFacebook(): firebase.Promise<any> {
    if (this.platform.is('cordova')) {
      return this.facebook.login(['email', 'public_profile']).then(res => {
        this.facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        //return this.saveUserFacebook();
        return this.afAuth.auth.signInWithCredential(this.facebookCredential);
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((res => {
        this.facebookCredential = res.credential;
        this.facebookUser = res.additionalUserInfo;
      }));
    }
  }

  signInWithEmail(email: string, password: string): any {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  registerWithEmail(email: string, password: string): any {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  resetPassword(email: string): any {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  doLogout(): any {
    return this.afAuth.auth.signOut();
  }

  public getMe() {
    return this.callFacebookApi("me?fields=picture,email,id,name");
  }

  public getFriends() {
    return this.callFacebookApi('me/friends');
  }

  public callFacebookApi(path: string) {
    return new Promise(resolve => {
      this.http.get('https://graph.facebook.com/v2.9/' + path +
        (path.indexOf('?') > 0 ? '&' : '?') + 'access_token=' +
        this.facebookCredential.accessToken)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          this.presentToast(`Erro no acesso a Api Grafica do Facebook
          :` + JSON.stringify(error));
        })
    });
  }

  public presentToast(message: string) {
    let toast = this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  signOut(): void {
    this.afAuth.auth.signOut();
  }

}
