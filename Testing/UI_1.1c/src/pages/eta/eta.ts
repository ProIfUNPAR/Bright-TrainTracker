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
   kereta : Array<{trainName : string, route : number[] }>;

   myTrain : any;

   //dummy station
   //stasiunKereta : string[];

   //real station
   stasiun : Array<{id : string, lat : string, lng : string, name : string}>;
   stationDistances : number[];

   //Geolocation variable
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
  this.geolocation = geolocation;
  this.navParams = navParams;
 }

 ionViewDidLoad(){
   this.initializeStasiun();

   this.selectedItem = this.navParams.get('item');
   this.calculateRoute();
   this.initializeStopoverStations();



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
     this.radius = 6371; // Earth's radius (km)
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

 initializeStasiun() {
   //dummy
   // this.stasiunKereta = [
   //   'Surabaya',
   //   'Mojokerto'
   // ];

   this.stationDistances = [ 0,0,0,0,0 ];

   //real
   this.stasiun = [
      {id:"0",lat:"-6.9197513",lng:"107.6068601",name:"Stasiun Bandung"},
      {id:"1",lat:"-6.9140761",lng:"107.4500881",name:"Stasiun Ciroyom"},
      {id:"2",lat:"-6.8961886",lng:"107.5611397",name:"Stasiun Cimindi"},
      {id:"3",lat:"-6.885726",lng:"107.536139",name:"Stasiun Cimahi"},
      {id:"4",lat:"-6.9188432",lng:"107.6259046",name:"Stasiun Cikudapateuh"},
      {id:"5",lat:"-6.924956",lng:"107.6463016",name:"Stasiun Kiaracondong"},
      {id:"6",lat:"-6.9411097",lng:"107.6898944",name:"Stasiun Gedebage"},
      {id:"7",lat:"-6.864504",lng:"107.514912",name:"Stasiun Gadobangkong"},
      {id:"8",lat:"-6.842946",lng:"107.497321",name:"Stasiun Padalarang"},
      {id:"9",lat:"-6.949642",lng:"107.714480",name:"Stasiun Cimekar"},
      {id:"10",lat:"-6.964706",lng:"107.755935",name:"Stasiun Rancaekek"},
      {id:"11",lat:"-6.980721",lng:"107.799820",name:"Stasiun Haurpugur"},
      {id:"12",lat:"-6.981495",lng:"107.832635",name:"Stasiun Cicalengka"},
      {id:"13",lat:"-7.018761",lng:"107.887343",name:"Stasiun Nagreg"},
      {id:"14",lat:"-6.803287",lng:"107.463484",name:"Stasiun Cilame"},
      {id:"15",lat:"-6.780171",lng:"107.432089",name:"Stasiun Sasaksaat"},
      {id:"16",lat:"-6.736113",lng:"107.398557",name:"Stasiun Rendeh"},
      {id:"17",lat:"-6.715671",lng:"107.390846",name:"Stasiun Cikadongdong"},
      {id:"18",lat:"-6.640907",lng:"107.391218",name:"Stasiun Plered"},
      {id:"19",lat:"-6.9411097",lng:"107.6898944",name:"Stasiun Sukatani"},
      {id:"20",lat:"-6.573453",lng:"107.430789",name:"Stasiun Ciganea"},
      {id:"21",lat:"-6.552753",lng:"107.446476",name:"Stasiun Purwakarta"},
      {id:"22",lat:"-6.510259",lng:"107.456340",name:"Stasiun Sadang"},
      {id:"23",lat:"-6.467953",lng:"107.479608",name:"Stasiun Cibungur"},
      {id:"24",lat:"-6.406352",lng:"107.458953",name:"Stasiun Cikampek"},
      {id:"25",lat:"-6.393095",lng:"107.433215",name:"Stasiun Dawuan"},
      {id:"26",lat:"-6.368975",lng:"107.374685",name:"Stasiun Kosambi"},
      {id:"27",lat:"-6.349889",lng:"107.345358",name:"Stasiun Kelari"},
      {id:"28",lat:"-6.305149",lng:"107.300157",name:"Stasiun Karawang"},
      {id:"29",lat:"-6.269977",lng:"107.261180",name:"Stasiun Kedunggedeh"},
      {id:"30",lat:"-6.270508",lng:"107.179853",name:"Stasiun Lemah Abang"},
      {id:"31",lat:"-6.255409",lng:"107.145132",name:"Stasiun Cikarang"},
      {id:"32",lat:"-6.258713",lng:"107.056040",name:"Stasiun Tambun"},
      {id:"33",lat:"-6.236069",lng:"107.999416",name:"Stasiun Bekasi"},
      {id:"34",lat:"-6.224290",lng:"106.979383",name:"Stasiun Kranji"},
      {id:"35",lat:"-6.219304",lng:"106.952129",name:"Stasiun Cakung"},
      {id:"36",lat:"-6.216313",lng:"106.928268",name:"Stasiun Buaran"},
      {id:"37",lat:"-6.213438",lng:"106.898715",name:"Stasiun Klender"},
      {id:"38",lat:"-6.209214",lng:"106.862251",name:"Stasiun Pondok Jati"},
      {id:"39",lat:"-6.193812",lng:"106.856540",name:"Stasiun Kramat"},
      {id:"40",lat:"-6.185909",lng:"106.850707",name:"Stasiun Gang Sentiong"},
      {id:"41",lat:"-6.209924",lng:"106.850208",name:"Stasiun Manggarai"},
      {id:"42",lat:"-6.552772",lng:"106.8669175",name:"Stasiun Jatinegara"},
      {id:"43",lat:"-6.1767728",lng:"106.8306364",name:"Stasiun Gambir"},
      {id:"44",lat:"-6.1660551",lng:"106.7037758",name:"Stasiun Kalideres"},
      {id:"45",lat:"-6.1620051",lng:"106.7892581",name:"Stasiun Grogol"},
      {id:"46",lat:"-6.2371608",lng:"106.7825451",name:"Stasiun Kebayoran Lama"},
      {id:"47",lat:"-6.1985998",lng:"106.8412682",name:"Stasiun Cikini"},
      {id:"48",lat:"-6.330576",lng:"106.8349062",name:"Stasiun Lenteng Agung"},
      {id:"49",lat:"-6.1280336",lng:"106.8451081",name:"Stasiun Ancol"},
      {id:"50",lat:"-6.1857502",lng:"106.8108324",name:"Stasiun Tanah Abang"},
      {id:"51",lat:"-6.1586047",lng:"106.7561358",name:"Stasiun Kembangan"},
      {id:"52",lat:"-6.2140956",lng:"106.8851454",name:"Stasiun Cipinang"}
    ];
    this.kereta = [
      {trainName:"KA368 - Bandung Raya Eko", route : [0,5,10,11,12]},
      {trainName:"KA19 - Argo Parahyangan", route : [0,3,21,33,42,43]}
    ];
  }

  /**
  *STILL dummy location and destination
  */
 calculateRoute(){
   var aa : any = 0.00;
   var cc : any = 0.00;
   var dd : any = 0.00;

   //Geolocation variable
  var watch2: any;
  var latt:any = 0.00;
  var lonn:any = 0.00;
  var radiuss:any = 0.00;
  var latt2:any = 0.00;
  var lonn2:any = 0.00;

  var dLatt:any = 0.00;
  var dLonn:any = 0.00;

  //Ceritanya naik kereta Bandung Raya Eko
  console.log("Mau this");
  console.log(this);
   this.myTrain = this.kereta[0];
   console.log("Route kereta 1 :"+this.myTrain.route[1]);
   for(let i=0; i < this.myTrain.route.length-1;i++){

     //index for target station
     var idx = this.myTrain.route[i];
     var stat1 = this.stasiun[idx];
     idx = this.myTrain.route[i+1];
     var stat2 = this.stasiun[idx];

     //calculate distance between station
     //1st location
     latt = parseFloat(stat1.lat);
     lonn = parseFloat(stat1.lng);

     //2nd location
     latt2  = parseFloat(stat2.lat);
     lonn2 = parseFloat(stat2.lng);

     radiuss = 6371; // Earth's radius (km)
     dLatt = (Math.PI/180)*(latt2 - latt);
     dLonn = (Math.PI/180)*(lonn2 - lonn);
     aa = Math.sin(dLatt/2) * Math.sin(dLatt/2) +
          Math.cos((Math.PI/180)*latt) *
          Math.cos((Math.PI/180)*latt2) *
          Math.sin(dLonn / 2) *
          Math.sin(dLonn / 2);
     cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
     dd = radiuss * cc; // Distance in km
     dd = dd.toFixed(2);

     //write to array :
     this.stationDistances[i] = dd;
   }
 }


 initializeStopoverStations(){
   //console.log(this.stasiunKereta[0]);
   this.items = [];
   for (let i = 0; i < this.stationDistances.length-1; i++) {
     var idx = this.myTrain.route[i+1];
     this.items.push({
       jam: i + ' Jam',
       jarak: this.stationDistances[i] + ' Km',
       stasiun: this.stasiun[idx].name
     });
   }
  }
}
