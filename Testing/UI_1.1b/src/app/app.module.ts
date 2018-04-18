import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

// Import for geolocation (lan, lon) fitur
import { Geolocation } from '@ionic-native/geolocation';

// Import all navigated page
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
  import { ListPage } from '../pages/list/list';
import { EtaPage } from '../pages/eta/eta';
import { MapsPage } from '../pages/maps/maps';
import { SettingsPage } from '../pages/settings/settings';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Initialize Firebase
  export const firebaseConfig={
    apiKey: "AIzaSyDNZPOAmJoiZk39ViPjV0oVz3z6_xgHg68",
    authDomain: "bright-traintracker.firebaseapp.com",
    databaseURL: "https://bright-traintracker.firebaseio.com",
    projectId: "bright-traintracker",
    storageBucket: "bright-traintracker.appspot.com",
    messagingSenderId: "763792811483"

  }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
      ListPage,
    EtaPage,
    MapsPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
      ListPage,
    EtaPage,
    MapsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
  ]
})
export class AppModule {}
