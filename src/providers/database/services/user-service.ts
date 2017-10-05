import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { User } from '../database-providers';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UserService {
  private basePath: string = '/users';
  private data: any;

  constructor(
    private db: AngularFireDatabase,
    private toast: ToastController
  ) { 
    this.data = this.db.list(this.basePath)
  }

  getList(query = {}) {
    return this.db.list(this.basePath);
  }

  get(key: string){
    const itemPath = `${this.basePath}/${key}`;    
    return this.db.object(itemPath);
  }

  create(rec): void {
    const newRec = {
      facebookId: rec.id,
      name: rec.name,
      profilePic: rec.profilePic
    };

    this.db.database.ref(this.basePath + rec.facebookId).set(newRec)
      .then(success => { return newRec })
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

  sendEnvite(from, to) {
    this.db.database
    .ref('users/'+ to.Id + "/invites/" + from.id )
    .set(from)
    .catch(error => this.handleError(error));
  }

  removeEnvite(from, to) {
    this.db.database
    .ref('users/'+ to.Id + "/invites/" + from.id ).remove().catch(error => this.handleError(error));
  }


  receiveEnvite(from, to) {
    this.db.database
    .ref('users/'+ to.Id + "/invites/" + from.id )
    .set(from)
    .catch(error => this.handleError(error));
  }
  private handleError(error) {
    const toast = this.toast.create({ message: error, duration: 3000, position: 'top' });  
    toast.present();
  }
}