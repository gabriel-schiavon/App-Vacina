import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuestionarioService } from '../services/questionario.service';
import { VacinaService } from '../services/vacina.service';



@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.page.html',
  styleUrls: ['./questionario.page.scss'],
  standalone: false,
})

export class QuestionarioPage implements OnInit {

  constructor(private router: Router, private http: HttpClient, private questionarioService: QuestionarioService, private vacinaService:VacinaService) { }

  usuarioLogado: any;
  idade: number = 0;
  vacinasParaMostrar: string[] = [];
  respostasVacinas: any = {};
  datasVacinas: any = {};

ngOnInit() {
  console.log('[ngOnInit] Iniciando carregamento');

  this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || '{}');
  console.log('[ngOnInit] Usuário:', this.usuarioLogado);

  if (this.usuarioLogado?.dataNasc) {
    this.idade = this.calcularIdade(this.usuarioLogado.dataNasc);
    console.log('[ngOnInit] Idade calculada:', this.idade);
  }

  this.carregarVacinas();
}


  calcularIdade(dataNasc: string): number {
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    console.log(`[calcularIdade] Data nascimento: ${dataNasc}, Idade: ${idade}`);
    return idade;
  }



    carregarVacinas() {
        console.log('[carregarVacinas] Idade recebida:', this.idade);

    if (this.idade < 1) {
          console.log('Faixa: Menores de 1 ano');

      this.vacinasParaMostrar = ['BCG', 'Hepatite B', 'Pentavalente (1ª dose)', 'Pentavalente (2ª dose)', 'VIP/VOP (1ª dose)', 'VIP/VOP (2ª dose)', 'VIP/VOP (3ª dose)', 'Rotavírus humano (1ª dose)', 'Rotavírus humano (2ª dose)', 'Pneumocócica 10-valente (1ª dose)', 'Pneumocócica 10-valente (2ª dose)', 'Meningocócica C conjugada(1ª dose)', 'Meningocócica C conjugada(2ª dose)', 'Febre Amarela(1ª dose)','Pentavalente (3ª dose)'];
    }
    else if (this.idade >= 1 && this.idade < 2) {
          console.log('Faixa: 1 ano');

      this.vacinasParaMostrar = [ 'Tríplice Viral', 'Pneumocócica 10-valente (Reforço)', 'Meningocócica C conjugada(Reforço)', 'DTP (1º Reforço)', 'Poliomielite 1 e 3 - VOPb (1º Reforço)', 'Hepatite A (1ª dose)', 'Tetra viral (1ª dose)'];
    }
    else if (this.idade >= 4 && this.idade < 5) {
          console.log('Faixa: 4 anos');

      this.vacinasParaMostrar = ['DTP (2º Reforço)', 'Poliomielite 1 e 3 - VOPb (2º Reforço)', 'Varicela (1ª dose)', 'Febre Amarela (Reforço)'];
    }
    else if (this.idade >= 5 && this.idade < 9) {
          console.log('Faixa: 5 a 9 anos');

      this.vacinasParaMostrar = ['Pneumocócica 23-valente'];
    }
    else if (this.idade >= 9 && this.idade <= 10) {
          console.log('Faixa: 9 a 10 anos');

      this.vacinasParaMostrar = ['HPV infantil'];
    }
    else if (this.idade >= 11 && this.idade <= 14) {
          console.log('Faixa: 11 a 14 anos');

      this.vacinasParaMostrar = ['HPV adolescente', 'Meningocócica ACWY'];
    }
    else if (this.idade >= 18 && this.idade < 20) {
          console.log('Faixa: 18 a 20 anos');

      this.vacinasParaMostrar = ['Tétano'];
    }
    else if (this.idade >= 20 && this.idade <= 29) {
          console.log('Faixa: 20 a 29 anos');

      this.vacinasParaMostrar = ['Tríplice viral (1ª dose)', 'Tríplice viral (2ª dose)', 'Tétano'];
    }
    else if (this.idade >= 30 && this.idade <= 59) {
          console.log('Faixa: 30 a59 anos');

      this.vacinasParaMostrar = ['Tríplice (dose única)', 'Tétano'];
    }
    else if (this.idade >= 60) {
          console.log('Faixa: 60 anos');

      this.vacinasParaMostrar = ['Febre Amarela (adulto)', 'Pneumocócica 23-valente (adulto)', 'Tétano'];
    }
    else {
          console.warn('Idade fora das faixas mapeadas');

      this.vacinasParaMostrar = [];
    }
      console.log('[carregarVacinas] Vacinas a mostrar:', this.vacinasParaMostrar);

  }


  onVacinaChange(vacina: string, resposta: string) {
    this.respostasVacinas[vacina] = resposta;
  }

onSubmit() {
  const vacinasTomadas = Object.entries(this.respostasVacinas)
    .filter(([nomeVacina, resposta]) => resposta === 'sim');

  console.log('Vacinas marcadas como tomadas:', vacinasTomadas);

  vacinasTomadas.forEach(([nomeVacina]) => {
    const dataAplicacao = this.datasVacinas[nomeVacina];

    console.log(`Buscando vacina por nome: "${nomeVacina}"`);
    
    this.vacinaService.buscarPorNome(nomeVacina)
      .subscribe(vacinaRes => {
        console.log('Resposta da API:', vacinaRes);

        if (vacinaRes.length > 0) {
          const vacina = vacinaRes[0];
          console.log(`Vacina encontrada: ${vacina.nomeVacina} (id: ${vacina.id})`);

          const historico = {
            idUsuario: this.usuarioLogado.id,
            idVacina: vacina.id,
            dataAplicacao: dataAplicacao
          };

          this.questionarioService.salvar(historico).subscribe({
            next: () => console.log(`Histórico salvo com sucesso:`, historico),
            error: err => console.error('Erro ao salvar histórico:', err)
          });

        } else {
          console.warn(`Vacina não encontrada: "${nomeVacina}"`);
        }
      });
  });

  this.router.navigateByUrl('/tabs/tab2');
}

}