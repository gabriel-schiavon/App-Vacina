import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

// Alteração para Trabalho
import { UsuarioService } from '../services/usuario.service';
import { VacinaService } from '../services/vacina.service';
import { HistoricoService } from '../services/historico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
  standalone: false
})
export class HistoricoPage implements OnInit {

  historicos: any[] = [];
  usuarioLogado: any = null;

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private usuarioService:UsuarioService,
    private historicoService: HistoricoService,
    private vacinaService:VacinaService
  ) {}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioLogado');
    console.log('🔍 Dados brutos do localStorage:', usuarioString);

    if (usuarioString) {
      try {
        this.usuarioLogado = JSON.parse(usuarioString);
        console.log('👤 Usuário logado:', this.usuarioLogado);
        this.carregarTodosHistoricos();
      } catch (error) {
        console.error('❌ Erro ao fazer parse do usuário do localStorage:', error);
      }
    } else {
      console.warn('⚠️ Nenhum usuário encontrado no localStorage.');
    }
  }

  carregarTodosHistoricos() {
  const cpfLogado = this.usuarioLogado.cpf;
  const idUsuarioLogado = this.usuarioLogado.id;

  this.usuarioService.listar().subscribe(usuarios => {
      console.log('🔎 Todos os usuários:', usuarios);
    const relacionados = usuarios.filter(u =>
      u.id === idUsuarioLogado || u.responsavelCpf === cpfLogado
    );
      console.log('👨‍👩‍👧 Relacionados:', relacionados);

    relacionados.forEach(usuario => {
      this.historicoService.listarPorUsuario(usuario.id).subscribe(historicoVacinas => {
          console.log(`📘 Histórico de ${usuario.nome}:`, historicoVacinas);
        const vacinas: any[] = [];
        let pendentes = historicoVacinas.length;

        if (pendentes === 0) {
          this.historicos.push({ nome: usuario.nome, vacinas: [] });
          return;
        }

        historicoVacinas.forEach(entry => {
          this.vacinaService.buscarPorId(entry.idVacina).subscribe(vacina => {
              console.log('💉 Vacina encontrada:', vacina);
            vacinas.push({
              nomeVacina: vacina.nomeVacina,
              dataAplicacao: new Date(entry.dataAplicacao)
            });

            pendentes--;

            if (pendentes === 0) {
              this.historicos.push({
                nome: usuario.nome,
                vacinas: vacinas.sort((a, b) => b.dataAplicacao.getTime() - a.dataAplicacao.getTime())
              });
            }
          });
        });
      });
    });
  });
}


  voltar() {
    this.navCtrl.navigateForward('/tabs/tab2');
  }
}
