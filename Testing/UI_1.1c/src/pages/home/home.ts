import { Component } from '@angular/core';
import { NavController, navParams } from 'ionic-angular';
import { AlertController} from 'ionic-angular';
import { EtaPage } from '../eta/eta';
import { MapsPage } from '../maps/maps';
import { Storage } from '@ionic/storage';

//Taking data from database.
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    //Var local storage
    storage : Storage;

    //trains: string[];
    //locations: string[];
    destinations : Array<{id : string, lat : string, lng : string, name : string}>;
    locations : Array<{id : string, lat : string, lng : string, name : string}>;
    trains : Array<{trainName : string, route : number[] }>;
    routeLocation : number[];
    routeDestination : number[];

    //this array will be filled with track according to the chosen train.
    trainLocations : any[] = [];
    route : any;

    //onchange variable
    kereta : string;
    tujuan: string;
    berangkat: string;

    constructor(private storage: Storage, public alertCtrl: AlertController, public navCtrl: NavController) {
      this.initializeTrainsAndLocations();
      //this.navParams = navParams;
      //this.stations = afDatabase.list('/').valueChanges();
      //this.initializeStations();
    }

    ionViewDidLoad(){
      //cek output
      this.storage.get('location').then((val) => {
        console.log('Your location is ', val);
      });
      this.storage.get('destination').then((val) => {
        console.log('Your destination is ', val);
      });

    }

/*  Stations and Trains Data */
    initializeTrainsAndLocations() {
      //dummy
      // this.locations = [
      // 'Surabaya',
      // 'Mojokerto',
      // 'Jombang',
      // 'Kertosono',
      // 'Nganjuk',
      // 'Wilangan',
      // 'Tasikmalaya'
      // ];
      this.destinations = [
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
      // this.trains = [
      //   'Argo Willis',
      //   'Parahyangan',
      //   'Turangga'
      // ];
      //real
      this.locations = [
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
       this.trains = [
         {trainName:"KA368 - Bandung Raya Eko", route : [0,5,10,11,12]},
         {trainName:"KA19 - Argo Parahyangan", route : [0,3,21,33,42,43]}
       ];

    }

    onChangeTrainLocation(event){
      this.kereta = event;
      this.kereta = this.kereta.replace(/\s+/g,'')
      this.storage.set('kereta', this.kereta);
      console.log(this.kereta);
      this.initializeRouteLocation();
    }

    /*
      Method to get the value from chosen option
    */
    onChangeDestination(event){
      this.tujuan = event;
      this.tujuan = this.tujuan.replace(/\s+/g,'')
      this.storage.set('destination', this.tujuan);
      console.log(this.tujuan); 
      //this.initializeRouteLocation();
    }
    /*
      Method to get the value from chosen option
    */
    onChangeLocation(event){
      this.berangkat = event;
      this.berangkat = this.berangkat.replace(/\s+/g,'')
      this.storage.set('location', this.berangkat);
    }

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
            this.navCtrl.push(MapsPage, { location: this.berangkat, destination: this.tujuan});
          }
        }]
      });
      confirmation.present();
    }


    //Creating list of stopover station,
    //based on the chosen train.
    initializeRouteLocation(){

      var myTrain = this.kereta;
      console.log(this.trains[1].trainName);
      for(let j = 0; j < this.trains.length;j++){
        if(myTrain == this.trains[j].trainName.replace(/\s+/g,'')){
          this.route = this.trains[j].route;
          console.log(this.route);
        }
      }
      var length = this.trains[0].route.length;

      //List of station based on train route track.
      for (let i = 0; i < length; i++) {
        var idx = this.route[i];
        var stationName = this.locations[idx].name;
        console.log(stationName);
        this.trainLocations.push({stationName: stationName});
      }
     }
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
