import { Component, OnInit } from '@angular/core';
import { VacinaService } from '../services/vacina.service';
import { LocalVacinasService } from '../services/local-vacinas.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-local-vacinas',
  templateUrl: './local-vacinas.page.html',
  styleUrls: ['./local-vacinas.page.scss'],
  standalone:false
})
export class LocalVacinasPage implements OnInit {
  vacinas: any[] = [];
  localLogado: any;

  constructor(
    private vacinaService: VacinaService,
    private vacinaLocalService: LocalVacinasService,
    private toast: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
  this.localLogado = JSON.parse(localStorage.getItem('localLogado') || '{}');

  // 1. Busca vacinas já vinculadas
  this.vacinaLocalService.buscarPorLocal(this.localLogado.id).subscribe(vinculadas => {
    const idsVinculadas = vinculadas.map(v => v.id);

    // 2. Lista todas as vacinas
    this.vacinaService.listarTodas().subscribe(vacinas => {
      this.vacinas = vacinas.map(v => ({
        ...v,
        selecionada: idsVinculadas.includes(v.id)
      }));
    });
  });
}


  salvar() {
  const selecionadas = this.vacinas.filter(v => v.selecionada).map(v => v.id);

  console.log('Enviando para o back-end:', {
    idLocal: this.localLogado.id,
    idsVacinas: selecionadas
  });

  this.vacinaLocalService.vincularVacinas(this.localLogado.id, selecionadas)
    .subscribe({
      next: () => {
        this.toast.create({ message: 'Vacinas vinculadas!', duration: 2000 }).then(t => t.present());
        this.router.navigate(['/home-local']);
      },
      error: (err) => {
        console.error('Erro ao salvar vínculo:', err);
      }
    });
}

}
