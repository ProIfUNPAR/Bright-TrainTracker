import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {
  stations : Observable<any[]>;
  title : string;
  constructor(public navCtrl: NavController, afDatabase: AngularFireDatabase) {
  	//console.log("test");
  	//retrieve data dari firebase
  	this.stations = afDatabase.list('/').valueChanges();
  	//this.title="test";
  }

}
