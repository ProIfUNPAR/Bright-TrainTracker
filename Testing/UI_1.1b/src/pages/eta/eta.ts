import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
// import { geodist } from 'geodist'

//Taking data from database.
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'page-eta',
  templateUrl: 'eta.html'
})
export class EtaPage {
   selectedItem: any;
   icons: string[];
  // keys : string[];
   kereta : Array<{trainName : string, route : string}>;
   stasiuns : Array<{id : string, lat : string, lng : string, name : string}>;
   items: Array<{jam: string, jarak: string, stasiun : string}>;
   //stations : Observable<any[]>;
  // dataCollection : Array<Object>;

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

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private geolocation: Geolocation) {
    //generate the station target AngularFireList
    //later on this stations will be based on the destination,
    //followed by each station represent the station that will be the stopover
    //this.stations = afDatabase.list('/').valueChanges();

    this.selectedItem = navParams.get('item');



    this.stasiuns = [
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
      {id:"27",lat:"-6.349889",lng:"107.345358",name:"Stasiun Klari"},
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
      {id:"52",lat:"-6.2140956",lng:"106.8851454",name:"Stasiun Cipinang"},
      {id:"53",lat:"-6.246864",lng:"107.018143",name:"Stasiun Bekasi Timur"},
      {id:"54",lat:"-6.760973",lng:"107.408864",name:"Stasiun Maswati"},
      {id:"55",lat:"-6.261862",lng:"107.083663",name:"Stasiun Cibitung"},
      {id:"56",lat:"-6.217556",lng:"106.940004",name:"Stasiun Klenderbaru"},
      {id:"57",lat:"-6.226074",lng:"106.858292",name:"Stasiun Tebet"},
      {id:"58",lat:"-6.242705",lng:"106.858794",name:"Stasiun Cawang"},
      {id:"59",lat:"-6.255368",lng:"106.854985",name:"Stasiun Duren Kalibata"},
      {id:"60",lat:"-6.262837",lng:"106.851836",name:"Stasiun Pasar Minggu Baru"},
      {id:"61",lat:"-6.283848",lng:"106.844217",name:"Stasiun Pasar Minggu"},
      {id:"62",lat:"-6.307915",lng:"106.838823",name:"Stasiun Tanjung Barat"},
      {id:"63",lat:"-6.330635",lng:"106.834978",name:"Stasiun Lenteng Agung"},
      {id:"64",lat:"-6.360765",lng:"106.831717",name:"Stasiun Universitas Indonesia"},
      {id:"65",lat:"-6.369050",lng:"106.832206",name:"Stasiun Pondok Cina"},
      {id:"66",lat:"-6.391190",lng:"106.821679",name:"Stasiun Depok Baru"},
      {id:"67",lat:"-6.404936",lng:"106.817255",name:"Stasiun Depok"},
      {id:"68",lat:"-6.448792",lng:"106.802458",name:"Stasiun Citayam"},
      {id:"69",lat:"-6.464271",lng:"106.852500",name:"Stasiun Cibinong"},
      {id:"70",lat:"-6.811084",lng:"107.464945",name:"Stasiun Tagogapu"},
      {id:"71",lat:"-6.822006",lng:"107.386062",name:"Stasiun Cipatat"},
      {id:"72",lat:"-6.824581",lng:"107.346545",name:"Stasiun Rajamandala"},
      {id:"73",lat:"-6.818394",lng:"107.298234",name:"Stasiun Cipeyeum"},
      {id:"74",lat:"-6.814074",lng:"107.251244",name:"Stasiun Ciranjang"},
      {id:"75",lat:"-6.813591",lng:"107.222657",name:"Stasiun Selajambe"},
      {id:"76",lat:"-6.816775",lng:"107.187579",name:"Stasiun Tipar"},
      {id:"77",lat:"-6.824585",lng:"107.142728",name:"Stasiun Cianjur"},
      {id:"78",lat:"-6.937604",lng:"107.121300",name:"Stasiun Cibeber"},
      {id:"79",lat:"-6.950032",lng:"107.061359",name:"Stasiun Lampegan"},
      {id:"80",lat:"-6.958534",lng:"107.037211",name:"Stasiun Cireungas"},
      {id:"81",lat:"-6.941465",lng:"106.992148",name:"Stasiun Gandasoli"},
      {id:"82",lat:"-6.925075",lng:"106.929587",name:"Stasiun Sukabumi"},
      {id:"83",lat:"-7.376311",lng:"108.542274",name:"Stasiun Banjar"},
      {id:"84",lat:"-7.329145",lng:"108.356002",name:"Stasiun Ciamis"},
      {id:"85",lat:"-7.100115",lng:"107.979467",name:"Stasiun Cibatu"},
      {id:"86",lat:"-7.094600",lng:"108.103213",name:"Stasiun Cipendeuy"},
      {id:"87",lat:"-6.719335",lng:"108.558784",name:"Stasiun Cirebon Prujakan"},
      {id:"88",lat:"-6.458582",lng:"107.940905",name:"Stasiun Haurgeulis"},
      {id:"89",lat:"-6.473090",lng:"108.306333",name:"Stasiun Jatibarang"},
      {id:"90",lat:"-7.322348",lng:"108.223811",name:"Stasiun Tasikmalaya"},
      {id:"91",lat:"-7.347236",lng:"108.430312",name:"Stasiun Bojong"},
      {id:"92",lat:"-7.058604",lng:"108.070560",name:"Stasiun Bumiwaluya"},
      {id:"93",lat:"-7.157498",lng:"108.145695",name:"Stasiun Ciawi"},
      {id:"94",lat:"-6.937604",lng:"107.121300",name:"Stasiun Cibeber"},
      {id:"95",lat:"-6.467972",lng:"107.479625",name:"Stasiun Cibungur"},
      {id:"96",lat:"-6.887913",lng:"107.126426",name:"Stasiun Cilaku"},
      {id:"97",lat:"-7.134336",lng:"108.118114",name:"Stasiun Cirahayu"},
      {id:"98",lat:"-6.686093",lng:"107.397989",name:"Stasiun Cisomang"},
      {id:"99",lat:"-7.286944",lng:"108.201001",name:"Stasiun Indihiang"},
      {id:"100",lat:"-7.053602",lng:"107.894007",name:"Stasiun Lebak Jero"},
      {id:"101",lat:"-7.084447",lng:"107.899663",name:"Stasiun Leles"},
      {id:"102",lat:"-7.353104",lng:"108.302707",name:"Stasiun Manon Jaya"},
      {id:"103",lat:"-6.409218",lng:"107.584170",name:"Stasiun Pabuaran"},
      {id:"104",lat:"-6.426446",lng:"107.688649",name:"Stasiun Pasirbungur"},
      {id:"105",lat:"-7.219560",lng:"108.191104",name:"Stasiun Rajapolah"},
      {id:"106",lat:"-7.064939",lng:"108.007265",name:"Stasiun Warung Bandrek"},
      {id:"107",lat:"-7.154509",lng:"111.590825",name:"Stasiun Cepu"},
      {id:"108",lat:"-7.736046",lng:"109.007070",name:"Stasiun Cilacap"},
      {id:"109",lat:"-7.610921",lng:"109.507770",name:"Stasiun Gombong"},
      {id:"110",lat:"-7.218755",lng:"110.899937",name:"Stasiun Gundih"},
      {id:"111",lat:"-7.633169",lng:"109.573493",name:"Stasiun Karanganyar"},
      {id:"112",lat:"-7.681909",lng:"109.662123",name:"Stasiun Kebumen"},
      {id:"114",lat:"-7.163653",lng:"110.635626",name:"Stasiun Kedungjati"},
      {id:"115",lat:"-7.630120",lng:"109.253538",name:"Stasiun Kroya"},
      {id:"116",lat:"-7.619092",lng:"109.139473",name:"Stasiun Maos"},
      {id:"117",lat:"-6.889687",lng:"109.664380",name:"Stasiun Pekalongan"},
      {id:"118",lat:"-7.419224",lng:"109.221922",name:"Stasiun Purwokerto"},
      {id:"119",lat:"-7.561684",lng:"110.796510",name:"Stasiun Purwosari"},
      {id:"120",lat:"-6.972837",lng:"110.414697",name:"Stasiun Semarang Poncol"},
      {id:"121",lat:"-6.964446",lng:"110.427923",name:"Stasiun Semarang Tawang"},
      {id:"122",lat:"-7.486345",lng:"108.807519",name:"Stasiun Sidareja"},
      {id:"123",lat:"-7.557016",lng:"110.821417",name:"Stasiun Solo Balapan"},
      {id:"124",lat:"-7.562218",lng:"110.839498",name:"Stasiun Solo Jebres"},
      {id:"125",lat:"-6.867349",lng:"109.142690",name:"Stasiun Tegal"},
      {id:"126",lat:"-6.970883",lng:"110.069743",name:"Stasiun Weleri"},
      {id:"127",lat:"-7.106188",lng:"112.168761",name:"Stasiun Babat"},
      {id:"128",lat:"-7.598891",lng:"112.778317",name:"Stasiun Bangil"},
      {id:"129",lat:"-7.817230",lng:"112.015549",name:"Stasiun Kediri"},
      {id:"130",lat:"-7.789200",lng:"110.363487",name:"Stasiun Jogjakarta"},
      {id:"131",lat:"-7.618830",lng:"111.524395",name:"Stasiun Madiun"},
      {id:"132",lat:"-7.994869",lng:"112.632595",name:"Stasiun Malang Kota Lama"},
      {id:"133",lat:"-7.558042",lng:"112.233614",name:"Stasiun Jombang"},
      {id:"134",lat:"-7.726044",lng:"109.907126",name:"Stasiun Kutoarjo"},
      {id:"135",lat:"-7.265377",lng:"112.751977",name:"Stasiun Surabaya Gubeng"},
      {id:"136",lat:"-7.600247",lng:"111.902752",name:"Stasiun Nganjuk"},
      {id:"137",lat:"-7.592115",lng:"112.100625",name:"Stasiun Kertosono"},
      {id:"138",lat:"-7.472167",lng:"112.434921",name:"Stasiun Mojokerto"},
      {id:"139",lat:"-7.859558",lng:"110.157929",name:"Stasiun Wates"},
      {id:"140",lat:"-7.712342",lng:"110.603024",name:"Stasiun Klaten"},
      {id:"141",lat:"-7.102166",lng:"112.222232",name:"Staiun Gembong"},
      {id:"142",lat:"-7.456970",lng:"112.713512",name:"Stasiun Sidoarjo"},
      {id:"143",lat:"-7.836726",lng:"112.697624",name:"Stasiun Lawang"},
      {id:"144",lat:"-7.977497",lng:"112.637028",name:"Stasiun Malang"},
      {id:"145",lat:"-7.442099",lng:"111.386397",name:"Stasiun Paron"},
      {id:"146",lat:"-8.062896",lng:"111.904488",name:"Stasiun Tulungagung"},
      {id:"147",lat:"-8.101338",lng:"112.162802",name:"Stasiun Blitar"},
      {id:"148",lat:"-8.131976",lng:"112.573285",name:"Stasiun Kepanjen"},
      {id:"149",lat:"-6.705386",lng:"108.555444",name:"Stasiun Cirebon"},
      {id:"150",lat:"-7.145437",lng:"110.900773",name:"Stasiun Ngrombo"},
      {id:"151",lat:"-7.164280",lng:"111.886684",name:"Stasiun Bojonegoro"},
      {id:"152",lat:"-7.112678",lng:"112.420030",name:"Stasiun Lamongan"},
      {id:"153",lat:"-7.248047",lng:"112.731164",name:"Stasiun Surabaya Pasarturi"},
      {id:"154",lat:"-8.088332",lng:"112.320040",name:"Stasiun Wlingi"},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},
      {id:"",lat:"",lng:"",name:""},



    ];
    this.kereta = [
      {trainName:"Argo Wilis (KA6) (ekse)",route :"[0,90,83,115,134,130,123,131,133,135]"},
      {trainName:"Turangga (KA50) (ekse)",route :"[0,86,90,83,115,134,130,123,131,136,137,133,138,135]"},
      {trainName:"Lodaya Pagi (KA80) (ekse&bis)",route :"[0,5,86,90,83,122,134,139,130,140,123]"},
      {trainName:"Lodaya Malam (KA82) (ekse&bis)",route :"[0,5,86,90,83,112,134,139,130,140,123]"},
      {trainName:"Mutiara Selatan (KA112/113) (bis)",route :"[0,5,86,90,84,83,115,141,112,134,130,123,131,136,137,133,138,135,142,128,143,144]"},
      {trainName:"Malabar (KA92) (ekse,bis&ekoAC)",route :"[0,5,86,90,83,115,141,112,134,130,123,145,131,136,137,129,146,147,148,132,144]"},
      {trainName:"Argo Parahyangan Dini Hari (KA19) (ekse)",route :"[0,3,21,33,42,43]"},
      {trainName:"Argo Parahyangan Pagi (KA21) (ekse)",route :"[0,3,33,42,43]"},
      {trainName:"Argo Parahyangan Siang (KA23) (ekse)",route :"[0,3,33,42,43]"},
      {trainName:"Argo Parahyangan Sore (KA25) (ekse)",route :"[0,3,33,42,43]"},
      {trainName:"Argo Parahyangan Malam (KA27) (ekse)",route :"[0,33,42,43]"},
      {trainName:"Argo Parahyangan Malam (KA29) (ekse)",route :"[0,3,33,42,43]"},
      {trainName:"Argo Parahyangan Pagi (KA31) (ekse)",route :"[0,3,33,42,43]"},
      {trainName:"Argo Parahyangan Pagi (KA33) (ekse)",route :"[0,3,33,42,43]"},
      {trainName:"Argo Parahyangan Malam (KA35F) (ekse)",route :"[0,3,33,42,43]"},
      {trainName:"Argo Parahyangan Pagi (KA37F) (ekse)",route :"[0,3,42,43]"},
      {trainName:"Harina (KA75) (ekse&bis)",route :"[0,3,21,24,149,125,117,121,150,107,151,127,152,153]"},
      {trainName:"Ciremai Express (KA99/98) (ekse&ekoAC)",route :"[0,3,21,24,88,89,149,125,117,120,121]"},
      {trainName:"Argo Bromo Anggrek Pagi (KA2) (ekse)",route :"[]"},
      {trainName:"Argo Bromo Anggrek Malam (KA4) (ekse)",route :"[]"},
      {trainName:"Argo Sindro (KA12) (ekse)",route :"[]"},
      {trainName:"Argo Muria (KA14) (ekse)",route :"[]"},
      {trainName:"Sembrani (KA48) (ekse)",route :"[]"},
      {trainName:"Argo Jati Pagi (KA16) (ekse)",route :"[]"},
      {trainName:"Argo Jati Sore (KA18) (ekse)",route :"[]"},
      {trainName:"Argo Jati Pagi (KA40F) (ekse)",route :"[]"},
      {trainName:"Argo Cirebon Express Siang (KA68) (ekse&bis)",route :"[]"},
      {trainName:"Argo Cirebon Express Malam 2 (KA70) (ekse&bis)",route :"[]"},
      {trainName:"Argo Cirebon Express Malam 1 (KA72) (ekse&bis)",route :"[]"},
      {trainName:"Tegal Bahari Siang 1 (62) (ekse&bis)",route :"[]"},
      {trainName:"Tegal Bahari Siang 2 (64) (ekse&bis)",route :"[]"},
      {trainName:"Tegal Bahari Malam (66) (ekse&bis)",route :"[]"},
      {trainName:"Bangunkarta (KA56) (ekse)",route :"[]"},
      {trainName:"Argo Lawu (KA8F) (ekse)",route :"[]"},
      {trainName:"Argo Dwipangga (KA10) (ekse)",route :"[]"},
      {trainName:"Taksaka Siang (KA51) (ekse)",route :"[]"},
      {trainName:"Taksaka Malam (KA54) (ekse)",route :"[]"},
      {trainName:"Bima (KA42) (ekse)",route :"[]"},
      {trainName:"Gajayana (KA42) (ekse)",route :"[]"},
      {trainName:"Purwojaya (KA58/59) (ekse&bis)",route :"[]"},
      {trainName:"Argo Parahyangan Dini Hari (KA20)",route :"[]"},
      {trainName:"Argo Parahyangan Pagi (KA22)",route :"[]"},
      {trainName:"Argo Parahyangan Siang (KA24)",route :"[]"},
      {trainName:"Argo Parahyangan Sore (KA26)",route :"[]"},
      {trainName:"Argo Parahyangan Malam 1 (KA28)",route :"[]"},
      {trainName:"Argo Parahyangan Malam 2 (KA30)",route :"[]"},
      {trainName:"Argo Parahyangan Siang (KA32)",route :"[]"},
      {trainName:"Argo Parahyangan Siang 2 (KA34)",route :"[]"},
      {trainName:"Gumarang (KA72) (ekse&bis)",route :"[]"},
      {trainName:"Tegal Arum (KA186) (ekoAC)",route :"[]"},
      {trainName:"Gayabaru Malam Selatan (KA154) (ekoAC)",route :"[]"},
      {trainName:"Serayu Pagi (KA212) (ekoAC)",route :"[]"},
      {trainName:"Serayu Malam (KA216) (eko)",route :"[]"},
      {trainName:"Kutojaya Selatan (KA204) (eko)",route :"[]"},
      {trainName:"Kahuripan (KA182) (eko)",route :"[]"},
      {trainName:"Pasundan (KA160) (eko)",route :"[]"},
      {trainName:"",route :"[]"},
      {trainName:"",route :"[]"},
      {trainName:"",route :"[]"},
      {trainName:"",route :"[]"},

    ];
    this.initializeStopoverStations();
    //LAST CODE IN CONSTRUCTOR
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


    //this.dataCollection = [];
    //this.dataCollection.push(this.stasiun);
    //console.log(this.dataCollection);
    //this.keys = Object.keys(this.stasiun[name]);
 }

 itemTapped(event, item) {
   // That's right, we're pushing to ourselves!
   this.navCtrl.push(EtaPage, { item: item});
 }

 initializeStopoverStations(){
   console.log(this.stasiuns);
   this.items = [];
   for (let i = 0; i < this.stasiuns.length; i++) {
     this.items.push({
       jam: i + ' Jam',
       jarak: i + ' Km',
       stasiun : this.stasiuns[i].name
       //stasiun: 'a '
       //stasiun: this.stations["name"][i] + i
       //icon: this.icons[Math.floor(Math.random() * this.icons.length)]
     });
     //this.stasiun = this.navParams.get('name');
    // this.stasiun.push({
      // stasiun : this.stasiun[name]
     //});
   }
 }
/* Not called?
  ionViewWillLeave(){
    this.watch.unsubscribe();
  }
*/

}
