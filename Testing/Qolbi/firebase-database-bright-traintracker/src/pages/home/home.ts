import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  stations : Observable<any[]>;
  stasiunAwal : Observable<any>;
  stasiunTujuan : Observable<any>;
  title : string;
  constructor(public navCtrl: NavController, public afDatabase: AngularFireDatabase) {
  	//console.log("test");
  	//retrieve data dari firebase
    //
  	this.stations = afDatabase.list('/').valueChanges();
  	//this.title="test";
    //select station berdasarkan
    //this.selectedStation = new Observable<any>();
    //let db=this.afDatabase.database;
       //db.ref().orderByChild("name").equalTo("Stasiun Bandung").once("value",function(snap){
        //console.log(snap.val());
    //});
  }
}
