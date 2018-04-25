import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgZone } from '@angular/core';
 import { BackgroundGeolocation, BackgroundGeolocationConfig,BackgroundGeolocationResponse} from '@ionic-native/background-geolocation';
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
  public watch: any;
  public x;
  constructor(public navCtrl: NavController, public Geolocation: Geolocation, public zone: NgZone,
    public backgroundGeolocation: BackgroundGeolocation
  ) {
    this.startTracking();
  }
  startTracking() {
    /*this.deviceMotion.getCurrentAcceleration().then(
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
//      console.log(this.lat ,      this.lng,      this.speed);

      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;
        this.speed = (location.speed * 3600)/1000 ; // can be speed * 3.6 and should be round for 2 decimal
        
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
      });

    });

  }
  stopTracking() {
    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();

  }

}
