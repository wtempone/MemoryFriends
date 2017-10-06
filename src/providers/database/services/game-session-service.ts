import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { User , GameSession , Player} from '../database-providers';
import { ToastController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class GameSessionService {
  basePath: string = '/game-sessions';
  data;
  currentUser: any;

  constructor(
    public db: AngularFireDatabase,
    public toast: ToastController,
    public translate: TranslateService,
    public alertCtrl: AlertController
  ) {
    this.data = this.db.list(this.basePath)
  }
/*
  getList(query = {}) {
    return this.db.list(this.basePath);
  }

  get(key: string){
    const itemPath = `${this.basePath}/${key}`;
    return this.db.object(itemPath);
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

  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });
    toast.present();
  }
*/
}