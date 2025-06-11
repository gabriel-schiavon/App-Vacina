import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questionario',
  templateUrl: './questionario.page.html',
  styleUrls: ['./questionario.page.scss'],
  standalone: false,

})

export class QuestionarioPage implements OnInit {

  constructor(private router: Router) { }


  idadeTeste = 90;
  vacinasParaMostrar: string[] = [];
  respostasVacinas: any = {};
  datasVacinas: any = {};

  ngOnInit() {
    this.carregarVacinas();
  }

  carregarVacinas() {
    if (this.idadeTeste < 1) { // Menores de 1 ano (bebês)
      this.vacinasParaMostrar = ['BCG', 'Hepatite B', 'Pentavalente', 'VIP/VOP', 'Rotavírus', 'Pneumocócica 10-valente'];
    }
    else if (this.idadeTeste === 1) { // 1 ano
      this.vacinasParaMostrar = ['Febre Amarela', 'Tríplice Viral', 'Pneumocócica (reforço)', 'Meningocócica C (reforço)', 'DTP (1º reforço)', 'VOP (reforço)', 'Hepatite A', 'Tetra Viral'];
    }
    else if (this.idadeTeste >= 2 && this.idadeTeste <= 4) { // 2 a 4 anos
      this.vacinasParaMostrar = ['DTP (2º reforço)', 'VOP (2º reforço)', 'Varicela (reforço)'];
    }
    else if (this.idadeTeste >= 9 && this.idadeTeste <= 14) { // 9 a 14 anos
      this.vacinasParaMostrar = ['HPV', 'Meningocócica ACWY'];
    }
    else if (this.idadeTeste >= 20 && this.idadeTeste <= 59) { // Adultos 20 a 59 anos
      this.vacinasParaMostrar = ['Hepatite B', 'dT (Dupla adulto)', 'Febre Amarela'];
    }
    else if (this.idadeTeste >= 60) { // Idosos 60+
      this.vacinasParaMostrar = ['Influenza', 'dT', 'Pneumocócica 23-valente'];
    }
    else {
      this.vacinasParaMostrar = []; // Idades não mapeadas
    }
  }

  onVacinaChange(vacina: string, resposta: string) {
    this.respostasVacinas[vacina] = resposta;
  }

  onSubmit() {

    console.log('Respostas:', this.respostasVacinas);
    console.log('Resposta vacina:', this.respostasVacinas);
    console.log('Data vacina:', this.datasVacinas);
    this.router.navigateByUrl('/tabs/tab2');
  }


}