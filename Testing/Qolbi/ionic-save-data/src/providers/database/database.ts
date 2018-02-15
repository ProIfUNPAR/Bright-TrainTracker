import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { Platform } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class DatabaseProvider {
	database:SQLiteObject;
	private databaseReader:BehaviorSubject<boolean>;

  constructor(public http: HttpClient, private sqliteporter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform) {
    this.databaseReady=new BehaviorSubject(false);
    this.platform.ready().then(()=>{
    	this.sqlite.create({
    	name: 'station.db',
    	location: 'deafult'
    	})
    	.then((db:SQLiteObject)=>{
    		this.database=db;
    		this.storage.get('database_filled').then(val =>{
    			if(val){
    				this.databaseReady.next(true);
    			}else{
    				this.fillDatabase();
    			}
    		})
    	})
    });
  }

  fillDatabase(){
  	this.http.get('assets/station.sql')
  	.map(res => res.text())
  	.subscribe(sql => {
  		this.sqlPorter.importSqltoDb(this.database,sql)
  		.then(data=>{
  			this.databaseReady.next(true);
  			this.storage.set('database_filled',true)
  		})
  		.catch(e => console.log(e));
  	});
  }

  addStation(stationName,lng,lat){
  	let data=[stationName,lang,lat];
  	return this.database.executeSql("INSERT INTO station(stationName,lng,lat) VALUES ('Dummy', '‎0', '0')",data).then(res =>{
  	return res;
  	});
  }

  getAllStation(){
  	
  }

  getDatabaseState(){
  	return this.databaseReady.asObservable();
  }
}
