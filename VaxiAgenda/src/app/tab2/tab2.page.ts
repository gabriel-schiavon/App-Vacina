import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

// Alterações do trabalho - Karen
import { HttpClient } from '@angular/common/http';
import { VacinaService } from '../services/vacina.service';
import { QuestionarioService } from '../services/questionario.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit{

  vacinasTomadas: any[] = [];
  usuarioLogado: any = null;

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private questionarioService: QuestionarioService,
    private vacinaService: VacinaService) {}

ngOnInit() {
  const usuarioString = localStorage.getItem('usuarioLogado');
  console.log('🔍 Dados brutos do localStorage:', usuarioString);

  if (usuarioString) {
    try {
      this.usuarioLogado = JSON.parse(usuarioString);
      console.log('👤 Usuário logado:', this.usuarioLogado);
      this.carregarVacinasTomadas();
    } catch (error) {
      console.error('❌ Erro ao fazer parse do usuário do localStorage:', error);
    }
  } else {
    console.warn('⚠️ Nenhum usuário encontrado no localStorage.');
  }
}


carregarVacinasTomadas() {
    console.log('✅ Método carregarVacinasTomadas() chamado');

  const idUsuario = this.usuarioLogado.id.toString();

    this.questionarioService.listarPorUsuario(idUsuario).subscribe(historicoVacinas => {
      const vacinas: any[] = [];
      let pendentes = historicoVacinas.length;

      if (pendentes === 0) {
        this.vacinasTomadas = [];
        return;
      }

      historicoVacinas.forEach(entry => {
        this.vacinaService.buscarPorId(entry.idVacina).subscribe(vacina => {
          vacinas.push({
            nomeVacina: vacina.nomeVacina,
            dataAplicacao: new Date(entry.dataAplicacao)
          });

          pendentes--;

          if (pendentes === 0) {
            this.vacinasTomadas = vacinas
              .sort((a, b) => b.dataAplicacao.getTime() - a.dataAplicacao.getTime())
              .slice(0, 3);
          }
        });
      });
    });
}


  irParaCalendario() {
    this.navCtrl.navigateForward('/tabs/tab1'); 
  }
  irParaHistorico() {
    this.navCtrl.navigateForward('/historico');
  }
}