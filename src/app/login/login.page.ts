import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false,
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor() {}

  ngOnInit() {
    // Inicialização do componente
  }

  login() {
    // Simulação de login
    if (this.email && this.password) {
      alert('Login realizado com sucesso!');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

}

