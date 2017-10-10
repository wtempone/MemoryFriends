import { AuthServiceProvider } from './../../auth-service';
import { Friend } from './../models/game-session';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { User, Invite, GameSession, Player } from '../database-providers';
import { ToastController, AlertController, App } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { GameSessionService } from './game-session-service';

@Injectable()
export class UserService {
  basePath: string = '/users';
  data: any;
  currentUser: User;
  friends: Friend[] = [];
  constructor(
    private db: AngularFireDatabase,
    private toast: ToastController,
    private translate: TranslateService,
    private alertCtrl: AlertController,
    private gameSessionSrvc: GameSessionService,
    protected app: App,
    private authSrvc: AuthServiceProvider
  ) {
    this.data = this.db.list(this.basePath)
  }

  loadFriends() {

    this.friends = [];
    
    this.authSrvc.getFriends().then((res: any) => {
      let friends = res.data;
      friends.forEach(friend => {
        this.authSrvc.getUser(friend.id).then(user => this.friends.push(<Friend>user))
      })
    })
  
  } 
  getList(query = {}) {
    return this.db.list(this.basePath);
  }

  get(key: string) {
    const itemPath = `${this.basePath}/${key}`;
    return this.db.object(itemPath).take(1);
  }

  set(rec: User) {
    const itemPath = `${this.basePath}/${rec.facebookId}`;
    const newRec: User = {
      facebookId: rec.facebookId,
      name: rec.name,
      email: rec.email,
      profilePic: rec.profilePic
    };
    return this.db.object(itemPath).set(newRec);
  }

  startListenerInvites() {
    const itemPath = `${this.basePath}/${this.currentUser.facebookId}/invites`;
    this.db.list(itemPath).$ref.on('child_added', newInvite => this.receiveInvite(newInvite.val()));
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
    const itemPath = `${this.basePath}/${invite.toUser.facebookId}/invites/${invite.fromUser.facebookId}`;
    return this.db.object(itemPath).set(invite);
  }

  removeEnvite(invite: Invite) {
    const itemPath = `${this.basePath}/${invite.toUser.facebookId}/invites/${invite.fromUser.facebookId}`;
    this.db.object(itemPath).remove()
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
                if (invite.gameSessionId) {
                  this.gameSessionSrvc.delete(invite.gameSessionId);
                }
              }
            },
            {
              text: values.START_BUTTON,
              handler: () => {
                this.removeEnvite({ toUser: this.currentUser, fromUser: invite.fromUser });

                let gameSession = new GameSession();

                if (!invite.gameSessionId) {
                  var player = <Player>{
                    score: 0,
                    user: this.currentUser
                  }
                  gameSession.players.push(player);
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
                  if (!invite.confirm) {
                    this.gameSessionSrvc.get(invite.gameSessionId).subscribe(
                      data => {
                        let gameSession: GameSession = data;
                        var player = <Player>{
                          score:0,
                          user: this.currentUser
                        }
                              gameSession.players.push(player);
                        let keyParse: any = gameSession;
                        this.gameSessionSrvc.set(keyParse.$key, gameSession).then(
                          () => {
                            let inviteResponse: Invite = {
                              fromUser: this.currentUser,
                              toUser: invite.fromUser,
                              gameSessionId: invite.gameSessionId,
                              confirm: true
                            };
                            this.sendEnvite(inviteResponse)
                            .then(()=>{
                              this.app.getRootNav().push('GameSessionPage', invite.gameSessionId);                              
                            })
                            .catch(error => this.handleError(error));                            
                          }
                        ).catch(error => this.handleError(error));
                      }
                    )
                  } else {
                    this.app.getRootNav().push('GameSessionPage', invite.gameSessionId);
                  }
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