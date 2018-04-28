import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data = { title:'', description:'', date:'', time:'' };
  constructor(public navCtrl: NavController,
    public localNotifications: LocalNotifications,
    public platform: Platform,
    public alertCtrl: AlertController) {

  }

  submit() {
    console.log(this.data);
    var date = new Date(this.data.date+" "+this.data.time);
    console.log(date);
    
    this.localNotifications.schedule({
      id: 1,
      text: 'Hey Wake Up',
      trigger: {at:date},
      led: 'FF0000',
      sound: this.setSound(),
      //data: { secret:key }
     });
    let alert = this.alertCtrl.create({
      title: 'Congratulation!',
      subTitle: 'Notification setup successfully at '+date,
      buttons: ['OK']
    });
    alert.present();
    this.data = { title:'', description:'', date:'', time:'' };
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/whatsapp_whistle.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
}
