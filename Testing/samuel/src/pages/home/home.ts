import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  watch: any;
  lat:any = 0.00;
  lon:any = 0.00;
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude, resp.coords.longitude);
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((resp) => {
      console.log(resp);
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
    });
  }

  ionViewWillLeave(){
    this.watch.unsubscribe();
  }

}