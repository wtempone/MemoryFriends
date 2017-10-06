import { AuthServiceProvider } from './../../providers/auth-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, AlertController, ViewController, IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Camera } from '@ionic-native/camera';
import { User } from '../../providers/database/database-providers';

@IonicPage()
@Component({
  selector: 'page-main-menu',
  templateUrl: 'main-menu.html',
})
export class MainMenuPage {
  @ViewChild('fileInput') fileInput;

  isReadyToSave: boolean;

  displayName: string;
  photoURL: any;
  friends: any[];
  form: FormGroup;
  user: User;
  inviteUser: any;

  
  constructor(public navCtrl: NavController, 
    public viewCtrl: ViewController,
    formBuilder: FormBuilder, 
    public camera: Camera, 
    private authServiceProvider: AuthServiceProvider,
    public alertController: AlertController,
    private db: AngularFireDatabase,     
    private translate: TranslateService
  ) {
    
//    this.displayName = authServiceProvider.userProfile.displayName;
//    this.photoURL = authServiceProvider.userProfile.photoURL;

    if (this.displayName) {
      this.form = formBuilder.group({
        profilePic: [this.photoURL],
        name: [this.displayName, Validators.required]
        });
    }
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });

    authServiceProvider.getFriends().then( (friends:any) => { 
      this.friends = [];
      friends.data.forEach(friend => {
        this.authServiceProvider.callFacebookApi(friend.id+'?fields=picture,name').then(fbprofile => {
          this.friends.push(fbprofile);  
        });
      });
    });

  }

  ionViewDidLoad() {

  }

  sendInvite(inviteUser:any) {
    this.translate.get([
      "DO_YOU_ENVITE_A_FRIEND",
      "DO_YOU_ENVITE_A_FRIEND_MESSAGE",
      "SEND_BUTTON",
      "CANCEL_BUTTON"]
    ,{value: inviteUser.name}).subscribe(
      (values) => {
        let confirm = this.alertController.create({
          title: values.DO_YOU_ENVITE_A_FRIEND ,
          message: values.DO_YOU_ENVITE_A_FRIEND_MESSAGE,
          buttons: [
            {
              text: values.CANCEL_BUTTON,
              handler: () => {
                console.log('Agree clicked');
              }
            },
            {
              text: values.SEND_BUTTON,
              handler: () => {
/*                this.db.database
                  .ref('users/'+inviteUser.id + "/invites/" + this.authServiceProvider.dbUser.facebookId )
                  .set(this.authServiceProvider.dbUser) ;*/
              }
            }
          ]
        });
        confirm.present().then();
      })
    }

  public solo() {
    //this.navCtrl.push(MenuSoloPage);
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
}
