import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

//import { Component} from '@angular/core';
//import { NavController } from 'ionic-angular';
//import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var google;

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html'
})
export class MapsPage {

  //local Storage
  storage : Storage;

  //Target station;
  Destination: any;
  //Your chosen station
  Location: any;
  //Location to Destination
  MyTrip: any;

  //Your realistic location
  MyLocation: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;


  constructor(private storage: Storage, public navCtrl: NavController,public navParams: NavParams) {
      this.Destination = navParams.get('destination');
      this.Location = navParams.get('location');

      //this.Destination = 'Tasikmalaya';
      console.log("Location :"+this.Location);
      console.log("Destination :"+this.Destination);

      //this.calculateAndDisplayRoute();
  }

  ionViewDidLoad(){
    //cek output
    this.storage.get('location').then((val) => {
      console.log('Your location from storage is ', val);
    });
    this.storage.get('destination').then((val) => {
      console.log('Your destination from storage is ', val);
    });

    this.MyTrip = this.storage.get('location') + " to " +this.storage.get('destination')
  }

  calculateSpeed(t1, lat1, lng1, t2, lat2, lng2) {
    // From Caspar Kleijne's answer starts
    /** Converts numeric degrees to radians */

    // From Caspar Kleijne's answer ends
    // From cletus' answer starts
    var R = 6371; // km
    var dLat = (lat2-lat1)* Math.PI / 180;;
    var dLon = (lng2-lng1)* Math.PI / 180;;
    var lat1 = lat1 * Math.PI / 180;
    var lat2 = lat2 * Math.PI / 180;

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) *    Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var distance = R * c;
    // From cletus' answer ends

    return distance / t2 - t1;
  }

calculateAndDisplayRoute() {
  //show and hide MAP
  //if false (not yet show map) show the map
  //if true(map already showed) hide the map


    let that = this;
    /*Speed Part :
    navigator.geolocation.getCurrentPosition(function(position1){
      var t1 = Date.now();
      console.log('test1');
      setTimeout(function(){
        navigator.geolocation.getCurrentPosition(function(position2){
          console.log('test2');
          var speed = that.calculateSpeed(t1 / 1000, position1.coords.latitude, position1.coords.longitude, Date.now() / 1000, position2.coords.latitude, position2.coords.longitude);
          console.log(speed);
        })
      },1000);
    })
    */

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: -6.9197513, lng: -107.6068601}
    });
    directionsDisplay.setMap(map);
    console.log('processing..')
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log('loading map..');
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        map.setCenter(pos);
        //that.MyLocation = new google.maps.LatLng(pos); //TO GET YOUR TRULLY POSITION
        that.MyLocation = that.Location;

        directionsService.route({
          origin: that.MyLocation,
          destination: that.Destination+"",
          travelMode: 'TRANSIT',
          transitOptions: {
            modes: ['TRAIN'],
            routingPreference: 'FEWER_TRANSFERS'
          }
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            console.log('finish')
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });

      }, function() {

      });
    } else {
      // Browser doesn't support Geolocation
    }

   /*
      This is why bug occur, because the location is trying to be shown while
      the location calculation not yet ready :

        directionsService.route({
          origin: this.MyLocation,
          destination: this.Destination+"",
          travelMode: 'TRANSIT',
          transitOptions: {
            modes: ['TRAIN'],
            routingPreference: 'FEWER_TRANSFERS'
          }
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        }
      );
   */

  }
}
