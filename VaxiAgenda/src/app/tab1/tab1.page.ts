import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { AgendamentoService } from '../services/agendamento.service';
import { VacinaService } from '../services/vacina.service';
import { LocalVacinasService } from '../services/local-vacinas.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone:false,
})

export class Tab1Page {

  vacinasDisponiveis: any[] = [];
  locaisDisponiveis: any[] = [];

  idVacinaSelecionada: number | null = null;
  idLocalSelecionado: number | null = null;
  dataSelecionada: string = '';

  usuarioLogado: any;
  datasMarcadas: string[] = [];



constructor(private agendamentoService: AgendamentoService, private httpClient:HttpClient, private vacinaService:VacinaService, private vacinaLocalService: LocalVacinasService) {}

ngOnInit() {
  this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado')!);
  this.carregarAgendamentos();
  this.vacinaService.naoTomadas(this.usuarioLogado.id).subscribe(v => {
    this.vacinasDisponiveis = v;
  });
}

carregarAgendamentos() {
  this.agendamentoService.listarPorUsuario(this.usuarioLogado.id)
    .subscribe(agendamentos => {
        this.datasMarcadas = agendamentos.map((a: any) => a.data);
    });
}

salvarData() {
  if (this.dataSelecionada && this.idVacinaSelecionada && this.idLocalSelecionado) {
    const agendamento = {
      idUsuario: this.usuarioLogado.id,
      idVacina: this.idVacinaSelecionada,
      idLocal: this.idLocalSelecionado,
      data: this.dataSelecionada
    };

    this.agendamentoService.cadastrar(agendamento).subscribe(() => {
      this.datasMarcadas.push(this.dataSelecionada);
      this.dataSelecionada = '';
      this.idVacinaSelecionada = null;
      this.idLocalSelecionado = null;
    });

    console.log('Agendamento a ser salvo:', agendamento);

  } else {
    console.warn('⚠️ Preencha todos os campos antes de agendar!');
  }
}

selecionarVacina(idVacina: number) {
  console.log('ID da vacina selecionada:', idVacina); // ← Se não aparecer, o (ionChange) não disparou

  this.vacinaLocalService.buscarLocaisPorVacina(idVacina).subscribe({
    next: (locais: any[]) => {
      console.log('Locais recebidos:', locais); // ← Se não aparecer, algo quebrou no back
      this.locaisDisponiveis = locais;
    },
    error: (err) => {
      console.error('Erro ao buscar locais:', err);
    }
  });
}




}
