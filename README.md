1. Instalar os pacotes necessários para rodar o projeto
    - Entrar na raiz do projeto /VaxiAgenda executar o comando "npm install"

Passos do trabalho
1.1. Criei uma pasta na raiz do repositório para trabalhar com a API 
    mkdir api-vacina
    cd api-vacina
    - Instalei o JSON Server na aplicação
        npm init -y
        npm install json-server
    - Add code in package.json
        "scripts": {
            "start": "json-server --watch db.json --port 3000"
        }
    - Rodar a api
        npm start

    Json acessivel em http://localhost:3000/usuario

OBS:. O consumo da API JSON Server normalmente com HTTP 
        requeststhis.http.post('http://localhost:3000/usuarios', novoUsuario);


1.2 Implementação do login
Atualizei os campos de input com [(ngModel)]
Add code login.page.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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
) {}


  ngOnInit() {
    // Inicialização do componente
  }

  login() {
  if (!this.email || !this.senha) {
    alert('Por favor, preencha todos os campos.');
    return;
  }
//consumo da api
  this.http.get<any[]>(`http://localhost:3000/usuario?email=${this.email}&senha=${this.senha}`)
    .subscribe(
      (usuario) => {
        if (usuario.length > 0) {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/tabs/tab1']);
        } else {
          alert('Email ou senha incorretos.');
        }
      },
      (erro) => {
        console.error('Erro ao fazer login:', erro);
        alert('Erro de conexão com o servidor.');
      }
    );
}
}

//implementação do cadastro
Atualizei o html com ngModel e mascaras em telefone e cpf além do campo de responsável e armazenamento no localstorage(ts)
<ion-content [fullscreen]="true" class="ion-padding">
  <div class="criarconta">

    <div class="header">
      <h1>Criar Conta</h1>
    </div>

    <div class="logo-container">
      <img src="../../assets/img/logo.PNG" alt="Logo Saúde" class="logo">
      <h1>VaxiAgenda</h1>
    </div>

    <div class="form">
      <ion-item class="input">
        <ion-input [(ngModel)]="usuario.nome" name="nome" label="Nome" type="text" labelPlacement="floating"></ion-input>
      </ion-item>

      <ion-item class="input">
        <ion-label position="floating">CPF</ion-label>
        <ion-input type="text" [(ngModel)]="usuario.cpf" (ionInput)="formatarCPF($event, 'usuario')" inputmode="numeric" maxlength="14"></ion-input>
      </ion-item>

      <ion-item class="input">
        <ion-input [(ngModel)]="usuario.dataNasc" (ionChange)="verificarIdade()" name="dataNasc" label="Data de Nascimento" type="date" labelPlacement="floating"></ion-input>
      </ion-item>
          
    <ion-item class="input" *ngIf="mostrarCampoResponsavel">
      <ion-label position="floating">CPF do Responsável</ion-label>
      <ion-input type="text" [(ngModel)]="usuario.responsavelCpf" (ionInput)="formatarCPF($event, 'responsavel')" inputmode="numeric" maxlength="14"></ion-input>
    </ion-item>
    <ion-item class="input">
      <ion-label position="floating">Telefone</ion-label>
      <ion-input type="text" [(ngModel)]="usuario.telefone" (ionInput)="formatarTelefone($event)" inputmode="numeric" maxlength="15"></ion-input>
    </ion-item>

      <ion-item class="input">
        <ion-input [(ngModel)]="usuario.endereco" name="endereco" label="Endereço" type="text" labelPlacement="floating"></ion-input>
      </ion-item>

      <ion-item class="input">
        <ion-input [(ngModel)]="usuario.email" name="email" label="Email" type="email" labelPlacement="floating"></ion-input>
      </ion-item>

      <ion-item class="input">
        <ion-input [(ngModel)]="usuario.senha" name="senha" label="Senha" type="password" labelPlacement="floating"></ion-input>
      </ion-item>

      <ion-button expand="block" class="botao" (click)="cadastrar()">
        inscreva-se
      </ion-button>
      <!-- 
        <div class="linha">
          <span>ou</span>
        </div>

        <div class="social">
          <ion-button fill="clear" class="social-button facebook">
            <ion-icon name="logo-facebook"></ion-icon>
          </ion-button>
          <ion-button fill="clear" class="social-button google">
            <ion-icon name="logo-facebook"></ion-icon>
          </ion-button>
        </div>
      -->
    </div> 

    <div class="footer">
      <p>Já tem uma conta?<a [routerLink]="['/login']">Entrar</a></p>
    </div>
  </div>
</ion-content>

Add code in cadastro.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: false
})
export class CadastroPage {

  usuario = {
    nome: '',
    cpf: '',
    dataNasc: '',
    telefone: '',
    endereco: '',
    email: '',
    senha: '',
    responsavelCpf: ''
  };
  mostrarCampoResponsavel = false;


  constructor(private router: Router, private http: HttpClient) {}

formatarCPF(event: any, tipo: 'usuario' | 'responsavel') {
  let valor = event.detail.value || '';
  valor = valor.replace(/\D/g, ''); // Remove não dígitos

  if (valor.length > 3) {
    valor = valor.replace(/^(\d{3})(\d)/, '$1.$2');
  }
  if (valor.length > 6) {
    valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  }
  if (valor.length > 9) {
    valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  }

  if (tipo === 'usuario') {
    this.usuario.cpf = valor;
  } else {
    this.usuario.responsavelCpf = valor;
  }
}
formatarTelefone(event: any) {
  let valor = event.detail.value || '';
  valor = valor.replace(/\D/g, '');

  if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
  }
  if (valor.length > 7) {
    valor = valor.replace(/(\d{5})(\d{4})$/, '$1-$2');
  }

  this.usuario.telefone = valor;
}

  verificarIdade() {
  const hoje = new Date();
  const nascimento = new Date(this.usuario.dataNasc);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
  }

  this.mostrarCampoResponsavel = idade < 18;
}

cadastrar() {
  if (
    this.usuario.nome && this.usuario.cpf &&
    this.usuario.dataNasc && this.usuario.telefone &&
    this.usuario.endereco && this.usuario.email &&
    this.usuario.senha
  ) {
    // Se menor de idade, verificar se CPF do responsável foi preenchido
    if (this.mostrarCampoResponsavel) {
      if (!this.usuario.responsavelCpf) {
        alert('Por favor, informe o CPF do responsável.');
        return;
      }

      // Verificar se CPF do responsável existe no sistema
      this.http.get<any[]>('http://localhost:3000/usuario?cpf=' + this.usuario.responsavelCpf).subscribe(res => {
        if (res.length === 0) {
          alert('CPF do responsável não encontrado. Cadastre o responsável primeiro.');
        } else {
          // Atribui CPF do responsável ao usuário
          this.usuario['responsavelCpf'] = this.usuario.responsavelCpf;
          this.salvar();
        }
      });
    } else {
      this.salvar();
    }
  } else {
    alert('Por favor, preencha todos os campos obrigatórios!');
  }
}
salvar() {
  this.http.post('http://localhost:3000/usuario', this.usuario).subscribe({
    next: (res: any) => {
      alert('Cadastro realizado com sucesso!');
      localStorage.setItem('usuarioLogado', JSON.stringify(res));
      this.router.navigate(['/questionario']);
    },
    error: (err) => {
      alert('Erro ao cadastrar usuário');
      console.error(err);
    }
  });
}

}








command+shift+v visualizar readme.md
