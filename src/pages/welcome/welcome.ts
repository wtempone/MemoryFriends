import { AuthServiceProvider } from './../../providers/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserService, User } from '../../providers/database/database-providers';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    private userSrvc: UserService
  ) {
  }

  signInWithFacebook(): void {
    this.authServiceProvider.signInWithFacebook()
      .then(() => {
        this.authServiceProvider.getMe()
        .then(
          data => {
            let userFB = <any>data;
            console.log(userFB);

            const currentUser: User = {
              email: userFB.email,
              facebookId: userFB.id,
              name: userFB.name,
              profilePic: userFB.picture
            }
            this.userSrvc.set(currentUser).then(success => { 
              this.userSrvc.currentUser = currentUser;
              console.log(this.userSrvc.currentUser);
              this.navCtrl.push('MainMenuPage')
            })
            .catch(error => this.handleError(error));
          }
        )
        .catch(error => this.handleError(error));
      });
  }
  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }
}
