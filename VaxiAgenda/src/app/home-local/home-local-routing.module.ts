import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeLocalPage } from './home-local.page';

const routes: Routes = [
  {
    path: '',
    component: HomeLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeLocalPageRoutingModule {}
