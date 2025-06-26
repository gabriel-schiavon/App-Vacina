import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroLocalPageRoutingModule } from './cadastro-local-routing.module';

import { CadastroLocalPage } from './cadastro-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroLocalPageRoutingModule
  ],
  declarations: [CadastroLocalPage]
})
export class CadastroLocalPageModule {}
