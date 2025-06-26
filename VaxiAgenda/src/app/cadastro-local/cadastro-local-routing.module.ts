import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroLocalPage } from './cadastro-local.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroLocalPageRoutingModule {}
