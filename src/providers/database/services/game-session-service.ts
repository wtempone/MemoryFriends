import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { User , GameSession , Player} from '../database-providers';
import { ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Message } from '../models/game-session';

@Injectable()
export class GameSessionService {
  basePath: string = '/game-sessions';
  data;

  numCards= [
    { numCards:12, rows:3, cols:4 },
    { numCards:16, rows:4, cols:4 },
    { numCards:20, rows:4, cols:5 },
    { numCards:30, rows:5, cols:6 },
    { numCards:36, rows:6, cols:6 },
    { numCards:42, rows:6, cols:7 },
]
  constructor(
    public db: AngularFireDatabase,
    public toast: ToastController,
    public translate: TranslateService,
    public alertCtrl: AlertController
  ) {
    this.data = this.db.list(this.basePath)
  }
  getList(query = {}) {
    return this.db.list(this.basePath);
  }

  get(key: string){
    const itemPath = `${this.basePath}/${key}`;
    return this.db.object(itemPath).take(1);
  }

  observe(key: string){
    const itemPath = `${this.basePath}/${key}`;
    return this.db.object(itemPath);
  }


  set(key:string, rec: GameSession) {
    const itemPath = `${this.basePath}/${key}`;
    return this.db.object(itemPath).set(rec);
  }

  setValue(path:string, value) {
    const itemPath = `${this.basePath}/${path}`;
    return this.db.object(itemPath).set(value);
  }

  create(rec) {
    return this.data.push(rec);
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

  sendMessage(key:string,id:number,message: Message) {
    const itemPath = `${this.basePath}/${key}/messages/${id}`;
    return this.db.object(itemPath).set(message);
  }
  startListenerMenssages(key:string,playerIndex:number) {
    const itemPath = `${this.basePath}/${key}/messages/`;
    this.db.list(itemPath).$ref.orderByKey().limitToLast(1).on('child_added', message => 
    {
      const msg:Message = <Message>message.val()
      if (msg.playerIndex != playerIndex){
        const toast = this.toast.create({ message: msg.text, duration: 3000, position: 'bottom',cssClass: 'toast-success' });
        toast.present();        
      }
    });
  }
  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }

}