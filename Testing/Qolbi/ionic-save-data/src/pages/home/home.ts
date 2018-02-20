import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, private sqlite: SQLite) {
    
  }
  
  stationName="";
  lat=0.0;
  lng=0.0;
  items=[];
  save();

  this.sqlite.create({
  name: 'stationData.db',
  location: 'default'
  })
  .then((db: SQLiteObject) => {

  //create table section
  db.executeSql('CREATE TABLE IF NOT EXISTS stationData(id INTEGER PRIMARY KEY AUTOINCREMENT,text stationName, real lat, real lng)', {})
  .then(() => alert('Executed SQL'))
  .catch(e => console.log(e));

  //data insert section
  db.executeSql('INSERT INTO stationData(stationName,lat,lng) VALUES(?)', [this.stationName,this.latitude,this.longitude])
  .then(() => alert('Executed SQL'))
  .catch(e => console.log(e));
  })
  .catch(e => alert(JSON.stringify(e)));

  //data retrieve section

  db.executeSql('select * from stationData', {}).then((data) => {

  alert(JSON.stringify(data));

  //alert(data.rows.length);
  //alert(data.rows.item(5).name);
  this.items = [];
  if(data.rows.length > 0) {
  for(var i = 0; i < data.rows.length; i++) {
  //alert(data.rows.item(i).name);�
  this.items.push({stationName: data.rows.item(i).stationName},
                   {lat: data.rows.item(i).lat},
                    {lng: data.rows.item(i).lng} );
  }
  }

  }, (err) => {
  alert('Unable to execute sql: '+JSON.stringify(err));
  });
  })
  .catch(e => alert(JSON.stringify(e)));
  alert(this.username);

  }
}
