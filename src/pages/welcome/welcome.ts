import { LocalStorage } from './../../providers/localstorage/localstorage';
import { AuthServiceProvider } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserService, User } from '../../providers/database/database-providers';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authServiceProvider: AuthServiceProvider,
    private toast: ToastController,
    public userSrvc: UserService,
    private localStorage: LocalStorage
  ) {}

  ionViewDidLoad() {
    if (this.authServiceProvider.signed()) {
      this.authServiceProvider.loadFacebookCredentials().then(() => this.setUser());
    }
  }

  signInWithFacebook(): void {
    this.authServiceProvider.signInWithFacebook().then(() => {
      this.setUser();
    });
  }

  setUser() {
    this.authServiceProvider.getMe()
      .then(
      data => {
        let userFB = <any>data;
        const currentUser: User = {
          email: userFB.email,
          facebookId: userFB.id,
          name: userFB.name,
          profilePic: userFB.picture
        }
        this.userSrvc.set(currentUser).then(success => {
          this.userSrvc.currentUser = currentUser;
          this.navCtrl.push('MainMenuPage')
        }).catch(error => this.handleError(error));
      }).catch(error => this.handleError(error));
  }

  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }
}
