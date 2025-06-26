import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeLocalPageRoutingModule } from './home-local-routing.module';

import { HomeLocalPage } from './home-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeLocalPageRoutingModule
  ],
  declarations: [HomeLocalPage]
})
export class HomeLocalPageModule {}
