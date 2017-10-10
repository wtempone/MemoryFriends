import { Friend } from './../../providers/database/models/game-session';
import { AuthServiceProvider } from './../../providers/auth-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, ViewController, IonicPage, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Camera } from '@ionic-native/camera';
import { User, Invite, UserService } from '../../providers/database/database-providers';

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  @ViewChild('fileInput') fileInput;
  form: FormGroup;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    formBuilder: FormBuilder,
    public camera: Camera,
    public alertController: AlertController,
    private translate: TranslateService,
    public userSrvc: UserService,
    private authSrvc: AuthServiceProvider,
    private toast: ToastController
  ) {
    if (userSrvc.currentUser) {      
      this.userSrvc.loadFriends();
      this.userSrvc.startListenerInvites();      
    }
  }

  sendInvite(inviteUser: Friend) {
    this.translate.get([
      "DO_YOU_ENVITE_A_FRIEND",
      "DO_YOU_ENVITE_A_FRIEND_MESSAGE",
      "SEND_BUTTON",
      "CANCEL_BUTTON"]
      , { value: inviteUser.name }).subscribe(
      (values) => {
        let confirm = this.alertController.create({
          title: values.DO_YOU_ENVITE_A_FRIEND,
          message: values.DO_YOU_ENVITE_A_FRIEND_MESSAGE,
          buttons: [
            {
              text: values.CANCEL_BUTTON
            },
            {
              text: values.SEND_BUTTON,
              handler: () => {
                let toUser: User = {
                  facebookId: inviteUser.id,
                  name: inviteUser.name,
                  profilePic: inviteUser.picture
                };
                let invite:Invite = {
                  fromUser: this.userSrvc.currentUser,
                  toUser: toUser
                }
                this.userSrvc.sendEnvite(invite).catch(error => this.handleError(error));
              }
            }
          ]
        });
        confirm.present().then();
      })
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  done() {
    if (!this.form.valid) { return; }
    this.viewCtrl.dismiss(this.form.value);
  }
  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }
}
