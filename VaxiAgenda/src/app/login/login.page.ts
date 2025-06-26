import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Alteração do trabalho - Karen
import { UsuarioService } from '../services/usuario.service';
import { LocalService } from '../services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage implements OnInit {

  email: string = '';
  senha: string = '';

constructor(
  private http: HttpClient,
  private router: Router,
  private usuarioService: UsuarioService,
  private localService: LocalService
) {}


  ngOnInit() {}

  login() {
  if (!this.email || !this.senha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }

  this.usuarioService.login(this.email, this.senha).subscribe({
  next: (usuario) => {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    this.router.navigate(['/tabs/tab2']);
  },
  error: () => {
    // se não encontrou usuário, tenta logar como local
    this.localService.login(this.email, this.senha).subscribe({
      next: (local) => {
        localStorage.setItem('localLogado', JSON.stringify(local));
        this.router.navigate(['/home-local']);
      },
      error: () => {
        alert('Email ou senha inválidos.');
      }
    });
  }
});

  }
}