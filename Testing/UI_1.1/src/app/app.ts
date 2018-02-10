import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-app',
  templateUrl: 'app.html',
})
export class SidebarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToSettings() {
      this.navCtrl.push('SettingsPage');
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
