import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	insert:any;
	select:any;
	getMsg:any;
  constructor(public navCtrl: NavController, public sqlite: SQLite) {
  		
  }

  stationName='';
  lat='';
  lng='';
  items=[];

  
  save(){
  	
	this.sqlite.create({
	name: 'station.db',
	location: 'default'
	})
	.then((db: SQLiteObject) => {

	//data insert section
	//membuat sebuah table jika table belum tersedia
	db.executeSql('CREATE TABLE IF NOT EXISTS stationInfo(id INTEGER PRIMARY KEY AUTOINCREMENT,stationName text,lat real,lng real)', {})
	.then(() => alert('Executed SQL'))
	.catch(e => console.log(e));

	//data insert section
	//memasukan data berdasarkan kolom yg ada
	this.insert=db.executeSql('INSERT INTO stationInfo VALUES(NULL,?,?,?)', [this.stationName,this.lat,this.lng])
	.then(data => alert('Executed SQL'))
	.catch(e => console.log(e));


	//data retrieve section
	this.select=db.executeSql('SELECT * FROM stationInfo ORDER BY id DESC', {})
	.then(data => {

	//alert(JSON.stringify(data));
	//alert(data.rows.length);
	//alert(data.rows.item(5).name);
	this.items = [];
	//if(data.rows.length > 0) {
	for(var i = 0; i < data.rows.length; i++) {
	//alert(data.rows.item(i).name);�
	this.items.push({id:data.rows.item(i).id,
					 stationName:data.rows.item(i).stationName,
					 lat:data.rows.item(i).lat,
					 lng:data.rows.item(i).lng});
	}
	//}

	}, (err) => {
	alert('Unable to execute sql: '+JSON.stringify(err));
	});
	})
	.catch(e => alert(JSON.stringify(e)));
	this.getMsg=document.getElementById("errorHere") as HTMLInputElement;
	this.getMsg.value=this.items[this.stationName,this.lat,this.lng];
	//alert(this.items);
	//alert(this.stationName);
	//alert(this.lat);
	//alert(this.lng);
	
	//this.getMsg.value=this.items[0];
	}

}

