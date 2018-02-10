import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilmsDetailsPage } from './films-details';

@NgModule({
  declarations: [
    FilmsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FilmsDetailsPage),
  ],
})
export class FilmsDetailsPageModule {}
