import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { geodist } from 'geodist'
@Component({
  selector: 'page-eta',
  templateUrl: 'eta.html'
})
export class EtaPage {
   selectedItem: any;
   icons: string[];
   items: Array<{jam: string, jarak: string, stasiun: string}>;

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

  //speed: any = 0.00;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
    this.selectedItem = navParams.get('item');
    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        jam: i + ' Jam',
        jarak: i + ' Km',
        stasiun: 'Stasiun' + i
        //icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude, resp.coords.longitude);

      //Our current location
      this.lat = resp.coords.latitude;
      this.lon =  resp.coords.longitude;

      //If you want your current location from bandung
      //this.lat = -6.914167;
      //this.lon = 107.6025;

      this.lat2  = -6.176716;
      this.lon2 = 106.830508;
	    this.radius=6371; // Earth's radius (km)
	    this.dLat = (Math.PI/180)*(this.lat2 - this.lat);
	    this.dLon = (Math.PI/180)*(this.lon2 - this.lon);
	    this.a = Math.sin(this.dLat/2) * Math.sin(this.dLat/2) + Math.cos((Math.PI/180)*this.lat) * Math.cos((Math.PI/180)*this.lat2) * Math.sin(this.dLon / 2) * Math.sin(this.dLon / 2);
	    this.c = 2 * Math.atan2(Math.sqrt(this.a), Math.sqrt(1-this.a));
      this.d = this.radius * this.c; // Distance in km
      this.d = this.d.toFixed(2);
    }).catch((error) => {
      console.log('Error getting location', error);
    });


 }

 itemTapped(event, item) {
   // That's right, we're pushing to ourselves!
   this.navCtrl.push(EtaPage, { item: item});
 }
/* Not called?
  ionViewWillLeave(){
    this.watch.unsubscribe();
  }
*/

}
