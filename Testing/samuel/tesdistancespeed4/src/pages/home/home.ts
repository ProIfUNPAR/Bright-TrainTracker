import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgZone } from '@angular/core';
import { BackgroundGeolocation} from '@ionic-native/background-geolocation';
// // import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Geolocation,Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public lat;
  public lng;
  public speed;
  public lat2;
  public lng2;
  public radius;
  public dLat;
  public dLon;
  public a;
  public c;
  public d;
  public watch: any;
  public eta;



  constructor(public navCtrl: NavController, public Geolocation: Geolocation, public zone: NgZone,public backgroundGeolocation: BackgroundGeolocation) {
    this.startTracking();
  }


  startTracking() {
    /*
    this.deviceMotion.getCurrentAcceleration().then(
    (acceleration: DeviceMotionAccelerationData) => //console.log(acceleration)
    this.x=0,
    (error: any) => console.log(error)
  );
  var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
  //console.log(acceleration);
});
*/

let config = {
  desiredAccuracy: 0,
  stationaryRadius: 5,
  distanceFilter: 10,
  debug: true,
  interval: 1000
};

this.backgroundGeolocation.configure(config).subscribe((location) => {

  //console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
  //console.log(this.lat ,      this.lng,      this.speed);

  this.zone.run(() => {
    this.lat = location.latitude;
    this.lng = location.longitude;
    this.speed = this.precisionRound((location.speed * 3600)/1000,1) ; // can be speed * 3.6 and should be round for 2 decimal
  });

}, (err) => {
  console.log(err);

});

this.backgroundGeolocation.start();

let options = {
  frequency: 1000,
  enableHighAccuracy: true
};

this.watch = this.Geolocation.watchPosition(options).filter((p) => p.coords !== undefined)
.subscribe((position: Geoposition) => {

  //console.log(position);

  this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;


    this.lat2  = -6.176716;
    this.lng2 = 106.830508;
    this.radius = 6371; // Earth's radius (km)
    this.dLat = (Math.PI/180)*(this.lat2 - this.lat);
    this.dLon = (Math.PI/180)*(this.lng2 - this.lng);
    this.a = Math.sin(this.dLat/2) * Math.sin(this.dLat/2) + Math.cos((Math.PI/180)*this.lat) * Math.cos((Math.PI/180)*this.lat2) * Math.sin(this.dLon / 2) * Math.sin(this.dLon / 2);
    this.c = 2 * Math.atan2(Math.sqrt(this.a), Math.sqrt(1-this.a));
    this.d = this.radius * this.c; // Distance in km
    this.d = this.precisionRound(this.d,1);
    //this.d = this.d.toFixed(2);
    this.eta = this.d/this.speed;
    this.eta = this.precisionRound(this.eta,1);
  });

});

}

stopTracking() {
  console.log('stopTracking');
  this.backgroundGeolocation.finish();
  this.watch.unsubscribe();

}


precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
}
