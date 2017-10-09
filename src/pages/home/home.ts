import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Items } from '../../mocks/providers/items'; 

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  numCards = 9;
  itemCards;
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items) {
    this.itemCards = items.items;
  }

  ionViewDidLoad() {
  }

}
