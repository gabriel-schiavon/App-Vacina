import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

// Alteração - Karen
import { UsuarioService } from '../services/usuario.service';

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


  constructor(
    private router: Router, 
    private http: HttpClient,
    private usuarioService: UsuarioService
  ) {}

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
    const u = this.usuario;
    if (u.nome && u.cpf && u.dataNasc && u.telefone && u.endereco && u.email && u.senha) {
      if (this.mostrarCampoResponsavel && !u.responsavelCpf) {
        alert('Por favor, informe o CPF do responsável.');
        return;
      }

      if (this.mostrarCampoResponsavel) {
        this.usuarioService.buscarPorCpf(u.responsavelCpf).subscribe(res => {
          if (res.length === 0) {
            alert('CPF do responsável não encontrado.');
          } else {
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
    this.usuarioService.cadastrar(this.usuario).subscribe({
      next: (res) => {
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
