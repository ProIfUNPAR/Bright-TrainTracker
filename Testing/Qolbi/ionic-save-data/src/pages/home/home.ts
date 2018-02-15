import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  setData(){
  	this.storage.set('Station', 'Jatinegara');
  }

  getData(){
  	this.storage.get('Station').then((val)=>{
      console.log('your data is: ',val);
    });
  }

}
