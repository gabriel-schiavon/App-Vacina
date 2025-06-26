import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'questionario',
    loadChildren: () => import('./questionario/questionario.module').then( m => m.QuestionarioPageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then( m => m.HistoricoPageModule)
  },
  {
    path: 'cadastro-local',
    loadChildren: () => import('./cadastro-local/cadastro-local.module').then( m => m.CadastroLocalPageModule)
  },
  {
    path: 'home-local',
    loadChildren: () => import('./home-local/home-local.module').then( m => m.HomeLocalPageModule)
  },
  {
    path: 'local-vacinas',
    loadChildren: () => import('./local-vacinas/local-vacinas.module').then( m => m.LocalVacinasPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
