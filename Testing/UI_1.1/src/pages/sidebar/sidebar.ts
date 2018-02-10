import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SidebarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sidebar',
  templateUrl: 'sidebar.html',
})
export class SidebarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goToSettings() {
      this.navCtrl.push('SettingsPage');
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SidebarPage');
  }

}
