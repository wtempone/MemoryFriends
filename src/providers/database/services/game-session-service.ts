import { Card } from './../models/game-session';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { User, GameSession, Player } from '../database-providers';
import { ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Message, Steps } from '../models/game-session';

@Injectable()
export class GameSessionService {
  basePath: string = '/game-sessions';
  data;

  numCards = [
    { numCards: 12, rows: 3, cols: 4 },
    { numCards: 16, rows: 4, cols: 4 },
    { numCards: 20, rows: 4, cols: 5 },
    { numCards: 30, rows: 5, cols: 6 },
    { numCards: 36, rows: 6, cols: 6 },
    { numCards: 42, rows: 6, cols: 7 },
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

  get(key: string) {
    const itemPath = `${this.basePath}/${key}`;
    return this.db.object(itemPath).take(1);
  }
  getValue(path: string) {
    return this.db.object(path).take(1);
  }

  observe(key: string) {
    const itemPath = `${this.basePath}/${key}`;
    return this.db.object(itemPath);
  }


  set(key: string, rec: GameSession) {
    const itemPath = `${this.basePath}/${key}`;
    return this.db.object(itemPath).set(rec);
  }

  setValue(path: string, value) {
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

  sendMessage(key: string, id: number, message: Message) {
    const itemPath = `${this.basePath}/${key}/messages/${id}`;
    return this.db.object(itemPath).set(message);
  }

  setAllPlayersCard(key: string, indexPlayer: number, cards) {
    const itemPath = `${this.basePath}/${key}/players/${indexPlayer}/cards`;
    return this.db.object(itemPath).set(cards);
  }

  addPlayerCard(key: string, indexPlayer: number, id: number, card) {
    const itemPath = `${this.basePath}/${key}/players/${indexPlayer}/cards/${id}`;
    return this.db.object(itemPath).set(card);
  }

  removePlayerCard(key: string, indexPlayer: number, id: number) {
    const itemPath = `${this.basePath}/${key}/players/${indexPlayer}/cards/${id}`;
    return this.db.object(itemPath).remove();
  }

  startListenerMenssages(key: string, playerIndex: number) {
    const itemPath = `${this.basePath}/${key}/messages`;
    this.db.list(itemPath).$ref.orderByKey().limitToLast(1).on('child_added', res => {
      const msg: Message = <Message>res.val()      
      if (msg.playerIndex != playerIndex) {       
      const toast = this.toast.create({ message: msg.text, duration: 3000, position: 'bottom', cssClass: 'toast-success' });
      toast.present();            
      this.checkMessage(key, msg.id).then((exitst:boolean) => {
          if (exitst) return;
        })
      }
    });
  }

  checkMessage(key: string, id: number) {
    const itemPath = `${this.basePath}/${key}/messages`;
    return new Promise(resolve => {
      this.db.object(itemPath).$ref.once('value').then((res) =>{
        let messages = res.val();
        if (messages.length > 0) {
          resolve (messages.filter(x => x.id == id).length > 0);
        } else {
          resolve(false);
        }
      });
    })
  }

  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }

}