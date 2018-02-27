import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AlertController} from 'ionic-angular';


/**
 * Generated class for the PopupalertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popupalert',
  templateUrl: 'popupalert.html',
})
export class PopupalertPage {

  constructor(public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopupalertPage');

  }
  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Alert',
    subTitle: 'You have arrived on your destination!' ,
    buttons: ['Dismiss']
  });
  alert.present();
}
}
