import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

// Alteração do Trabalho
import { LocalService } from '../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-local',
  templateUrl: './cadastro-local.page.html',
  styleUrls: ['./cadastro-local.page.scss'],
  standalone: false
})
export class CadastroLocalPage {
  local = {
    cnpj: '',
    nome: '',
    endereco: '',
    email: '',
    senha: ''
  };


  constructor(
    private http: HttpClient,
    private toast: ToastController,
    private localService: LocalService,
    private router: Router
  ) {}

  salvar() {
    this.localService.cadastrar(this.local).subscribe(() => {
      this.toast.create({ message: 'Local salvo com sucesso!', duration: 2000 }).then(t => t.present());
      this.local = { cnpj: '', nome: '', endereco: '', email: '', senha: '' };
        this.router.navigate(['/home-local']);
    }, err => {
      this.toast.create({ message: 'Erro ao salvar local', duration: 2000, color: 'danger' }).then(t => t.present());
    });
  }
}
