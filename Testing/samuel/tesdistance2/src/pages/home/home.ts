import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { geodist } from 'geodist'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  watch: any;
  lat:any = 0.00;
  lon:any = 0.00;
  radius:any = 0.00;
  lat2:any = 0.00;
  lon2:any = 0.00;
  
  dLat:any = 0.00;
  dLon:any = 0.00;
  dist:any = 0.00;
  
  a : any = 0.00;
  c : any = 0.00;
  d : any = 0.00;
  
  speed : any = 0.00;
  
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp.coords.latitude, resp.coords.longitude);
      /*this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      */
      this.lat = resp.coords.latitude;
      this.lon =  resp.coords.longitude;
      this.lat2  = -6.176716;
      this.lon2 = 106.830508;
	    this.radius=6371; // Earth's radius (km)
	    this.dLat = (Math.PI/180)*(this.lat2 - this.lat);
	    this.dLon = (Math.PI/180)*(this.lon2 - this.lon); 
	    this.a = Math.sin(this.dLat/2) * Math.sin(this.dLat/2) + Math.cos((Math.PI/180)*this.lat) * Math.cos((Math.PI/180)*this.lat2) * Math.sin(this.dLon / 2) * Math.sin(this.dLon / 2);
	    this.c = 2 * Math.atan2(Math.sqrt(this.a), Math.sqrt(1-this.a)); 
      this.d = this.radius * this.c; // Distance in km
      
      this.speed = resp.coords.speed;
	  
    }).catch((error) => {
      console.log('Error getting location', error);
    });
     this.watch = this.geolocation.watchPosition();
     this.watch.subscribe((resp) => {
       console.log(resp);
    // this.lat = resp.coords.latitude;
    // this.lon = resp.coords.longitude;
      
    //  this.lat = resp.coords.latitude;
    //  this.lon =  resp.coords.longitude;
    //  this.lat2  = -6.176716;
    //  this.lon2 = 106.830508;
    //  this.radius=6371; // Earth's radius (km)
    //  this.dLat = (Math.PI/180)*(this.lat2 - this.lat);
    //  this.dLon = (Math.PI/180)*(this.lon2 - this.lon); 
    //  this.a = Math.sin(this.dLat/2) * Math.sin(this.dLat/2) + Math.cos((Math.PI/180)*this.lat) * Math.cos((Math.PI/180)*this.lat2) * Math.sin(this.dLon / 2) * Math.sin(this.dLon / 2);
    //  this.c = 2 * Math.atan2(Math.sqrt(this.a), Math.sqrt(1-this.a)); 
    //  this.d = this.radius * this.c; // Distance in km
    
      this.speed = resp.coords.speed;
     
    }); 
	// /* geodist = require('geodist');
	// this.dist = geodist({lat: 41.85, lon: -87.65}, {lat: 33.7489, lon: -84.3881})console.log(dist) ;
	//  */
    
 }
  
  
  
  

  // ionViewWillLeave(){
  //   this.watch.unsubscribe();
  //  }

}