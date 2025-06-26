import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalVacinasPageRoutingModule } from './local-vacinas-routing.module';

import { LocalVacinasPage } from './local-vacinas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalVacinasPageRoutingModule
  ],
  declarations: [LocalVacinasPage]
})
export class LocalVacinasPageModule {}
