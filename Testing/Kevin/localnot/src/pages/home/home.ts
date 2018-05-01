import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
    notifyTime: any;
    notifications: any[] = [];
    days: any[];
    chosenHours: number;
    chosenMinutes: number;

    data = { title:'', description:'', date:'', time:'',seconds:'' };

    constructor(public navCtrl: NavController,
      public localNotifications: LocalNotifications,
      public platform: Platform,
      public alertCtrl: AlertController) {}
      
      submit() {
        console.log(this.data);
        var date = new Date(this.data.date+" "+this.data.time);
        //var time = new Time();
        console.log(date);
        this.localNotifications.schedule({
           text: 'Delayed ILocalNotification',
           trigger: { at: new Date(2017, 10, 27, 15) },
          
         
           led: 'FF0000',
           sound: this.setSound(),
        });
        let alert = this.alertCtrl.create({
          title: 'Congratulation!',
          subTitle: 'Notification setup successfully at '+date,
          buttons: ['OK']
        });
        alert.present();
        this.data = { title:'', description:'', date:'', time:'',seconds:'' };
      }

      setSound() {
        if (this.platform.is('android')) {
          return 'file://assets/sounds/Rooster.mp3'
        } else {
          return 'file://assets/sounds/Rooster.caf'
        }
      }
 
    
 
    
 
    
 
}