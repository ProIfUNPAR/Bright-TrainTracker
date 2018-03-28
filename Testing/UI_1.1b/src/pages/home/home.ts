import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { EtaPage } from '../eta/eta';

//Taking data from database.
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchQuery: string = '';
    trains: string[];
    locations: string[];
    stations : Observable<any[]>;

    constructor(public alertCtrl: AlertController, public navCtrl: NavController,public afDatabase: AngularFireDatabase) {
      this.initializeTrainsAndLocations();
      this.stations = afDatabase.list('/').valueChanges();
      //this.initializeStations();
    }

/*  //FOR SEARCHBAR and ion list option*/
    initializeTrainsAndLocations() {
      this.locations = [
        'Amsterdam',
        'Bogota',
        'Cimahi',
        'Depok',
        'Tasikmalaya'
      ];
      this.trains = [
        'Argo Willis',
        'Parahyangan',
        'Turangga'
      ];
    }

    initializeStations(){

    }

/* //YET, STILL DON'T KNOW WHAT IS THIS FOR
    getItems(ev: any) {
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the searchbar
      let val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
    */

    presentAlert() {
      let confirmation = this.alertCtrl.create({
        title: 'Confirmation',
        subTitle: 'Are you sure with this train and the location?' ,
        buttons: [{
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.navCtrl.push(EtaPage);
          }
        }]
      });
      confirmation.present();
    }

}
