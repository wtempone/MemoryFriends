import { Invite } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { User, GameSession, Player, GameSessionService } from '../database-providers';
import { ToastController, AlertController, App } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { } from './../../models/game-session';

@Injectable()
export class UserService {
  basePath: string = '/users';
  data: any;
  currentUser: User;

  constructor(
    private db: AngularFireDatabase,
    private toast: ToastController,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private gameSessionSrvc: GameSessionService,
    protected app: App  
  ) {
    this.data = this.db.list(this.basePath)
  }

  getList(query = {}) {
    return this.db.list(this.basePath);
  }

  get(key: string) {
    const itemPath = `${this.basePath}/${key}`;
    return this.db.object(itemPath);
  }

  set(rec: User) {
    const newRec: User = {
      facebookId: rec.facebookId,
      name: rec.name,
      profilePic: rec.profilePic
    };

    this.db.object(this.basePath + rec.facebookId).set(newRec)
      .then(success => { this.currentUser = <User>newRec; })
      .catch(error => this.handleError(error));
  }

  update(key: string, value: any): void {
    this.data.update(key, value).catch(error => this.handleError(error))
  }

  delete(key: string): void {
    this.data.remove(key).catch(error => this.handleError(error))
  }

  deleteAll(): void {
    this.data.remove().catch(error => this.handleError(error))
  }

  sendEnvite(invite: Invite) {
    return this.db.object('users/' + invite.toUser.facebookId + "/invites/" + invite.fromUser.facebookId)
      .set(invite)
      .catch(error => this.handleError(error));
  }

  removeEnvite(invite: Invite) {
    this.db.object('users/' + invite.toUser.facebookId + "/invites/" + invite.fromUser.facebookId).remove()
      .catch(error => this.handleError(error));
  }


  receiveEnvite(invite: Invite) {
    this.db.object('users/' + invite.toUser.facebookId + "/invites/" + invite.fromUser.facebookId)
      .set(invite)
      .catch(error => this.handleError(error));
  }

  receiveInvite(invite: Invite) {

    this.translate.get([
      "DO_YOU_RECEIVE_INVITE_A_FRIEND",
      "DO_YOU_RECEIVE_INVITE_A_FRIEND_MESSAGE",
      "DO_YOU_RECEIVE_CONFIRM_INVITE_A_FRIEND",
      "DO_YOU_RECEIVE_CONFIRM_INVITE_A_FRIEND_MESSAGE",
      "START_BUTTON",
      "NOT_NOW_BUTTON",
    ]
      , { value: invite.fromUser.name }).subscribe(
      (values) => {
        let confirm = this.alertCtrl.create({
          title: invite.gameSessionId ? values.DO_YOU_RECEIVE_CONFIRM_INVITE_A_FRIEND : values.DO_YOU_RECEIVE_INVITE_A_FRIEND,
          message: invite.gameSessionId ? values.DO_YOU_RECEIVE_CONFIRM_INVITE_A_FRIEND_MESSAGE : values.DO_YOU_RECEIVE_INVITE_A_FRIEND_MESSAGE,
          buttons: [
            {
              text: values.NOT_NOW_BUTTON,
              handler: () => {
                this.removeEnvite({ toUser: this.currentUser, fromUser: invite.fromUser });
              }
            },
            {
              text: values.START_BUTTON,
              handler: () => {
                this.removeEnvite({ toUser: this.currentUser, fromUser: invite.fromUser });

                let gameSession = new GameSession();

                if (!invite.gameSessionId) {
                  var player = new Player();
                  gameSession.addPlayer(player);
                  this.gameSessionSrvc.create(gameSession).then(
                    gameSession => {
                      let inviteResponse: Invite = {
                        fromUser: this.currentUser,
                        toUser: invite.fromUser,
                        gameSessionId: gameSession.key
                      };
                      this.sendEnvite(inviteResponse).catch(error => this.handleError(error));
                    }
                  );
                } else {
                  this.gameSessionSrvc.get(invite.gameSessionId).subscribe(
                    gameSession => {
                      if (!invite.confirm) {
                        let inviteResponse: Invite = {
                          fromUser: this.currentUser,
                          toUser: invite.fromUser,
                          gameSessionId: invite.gameSessionId,
                          confirm: true
                        };
                        this.sendEnvite(inviteResponse).catch(error => this.handleError(error));
                      }
                      this.app.getRootNav().push('GameSessionPage', invite.gameSessionId);
                    }
                  )
                }
              }
            }
          ]
        });
        confirm.present();
      })
  }

  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }

}