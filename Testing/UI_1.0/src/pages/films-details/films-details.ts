import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-films-details',
  templateUrl: 'films-details.html',
})
export class FilmsDetailsPage {
  filmId = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.filmId = this.navParams.get('filmId');
  }

  goBack(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilmsDetailsPage');
  }

}
