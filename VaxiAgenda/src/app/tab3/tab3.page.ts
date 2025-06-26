import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

// Alteração - Karen
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { HistoricoService } from '../services/historico.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone:false
})
export class Tab3Page implements OnInit {

  // Dados do perfil do usuário
  perfilUsuario = {
    id: 0,
    nome: '',
    cpf: '',
    dataNasc: '',
    telefone: '',
    endereco: '',
    email: '',
    senha: ''
  };


  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private http: HttpClient,
    private usuarioService: UsuarioService,
    private historicoService: HistoricoService
  ) {}

  ngOnInit() {
    const usuarioString = localStorage.getItem('usuarioLogado');
    if (usuarioString) {
      const usuarioLocal = JSON.parse(usuarioString);
      this.usuarioService.buscarPorId(usuarioLocal.id).subscribe(
        usuarioDB => this.perfilUsuario = usuarioDB,
        erro => {
          console.error('Erro ao buscar dados do banco:', erro);
          this.perfilUsuario = usuarioLocal;
        }
      );
    }
  }

  // Editar perfil
  async editarPerfil() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Editar Perfil',
      buttons: [
        {
          text: 'Alterar Foto',
          icon: 'camera',
          handler: () => {
            this.alterarFoto();
          }
        },
        {
          text: 'Editar Informações',
          icon: 'create',
          handler: () => {
            this.editarInformacoes();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  // Alterar foto do perfil
  async alterarFoto() {
    const alert = await this.alertController.create({
      header: 'Alterar Foto',
      message: 'Funcionalidade de alterar foto será implementada em breve.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Editar informações pessoais
  async editarInformacoes() {
  const alert = await this.alertController.create({
    header: 'Editar Informações',
    inputs: [
      {
        name: 'nome',
        type: 'text',
        placeholder: 'Nome',
        value: this.perfilUsuario.nome
      },
      {
        name: 'telefone',
        type: 'tel',
        placeholder: 'Telefone',
        value: this.perfilUsuario.telefone
      },
      {
        name: 'endereco',
        type: 'text',
        placeholder: 'Endereço',
        value: this.perfilUsuario.endereco
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Salvar',
        handler: (data) => {
          // Atualiza os dados locais
          this.perfilUsuario.nome = data.nome;
          this.perfilUsuario.telefone = data.telefone;
          this.perfilUsuario.endereco = data.endereco;

          // 👉 Envia os dados atualizados para o backend (JSON Server)
          this.usuarioService.atualizar(this.perfilUsuario)
            .subscribe(() => {
              this.mostrarToast('Informações atualizadas com sucesso!');
              // Atualiza localStorage também
              localStorage.setItem('usuarioLogado', JSON.stringify(this.perfilUsuario));
            }, (error) => {
              this.mostrarToast('Erro ao salvar informações!', 'danger');
              console.error(error);
            });

          return true; // Fecha o alert
        }
      }
    ]
  });

  await alert.present();
}


  // Alterar senha
  async alterarSenha() {
  const alert = await this.alertController.create({
    header: 'Alterar Senha',
    inputs: [
      {
        name: 'senhaAtual',
        type: 'password',
        placeholder: 'Senha atual'
      },
      {
        name: 'novaSenha',
        type: 'password',
        placeholder: 'Nova senha'
      },
      {
        name: 'confirmarSenha',
        type: 'password',
        placeholder: 'Confirmar nova senha'
      }
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Alterar',
        handler: (data) => {
          const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioLogado')!);

          // 1. Verifica se a senha atual está correta
          if (data.senhaAtual !== usuarioSalvo.senha) {
            this.mostrarToast('Senha atual incorreta!', 'danger');
            return false;
          }

          // 2. Verifica se as novas senhas coincidem
          if (data.novaSenha !== data.confirmarSenha) {
            this.mostrarToast('As senhas não coincidem!', 'danger');
            return false;
          }

          // 3. Atualiza a senha localmente
          this.perfilUsuario.senha = data.novaSenha;

          // 4. Salva no backend
          this.usuarioService.atualizar(this.perfilUsuario)
            .subscribe(() => {
              // 5. Atualiza localStorage
              localStorage.setItem('usuarioLogado', JSON.stringify(this.perfilUsuario));
              this.mostrarToast('Senha alterada com sucesso!');
            }, (error) => {
              this.mostrarToast('Erro ao atualizar senha!', 'danger');
              console.error(error);
            });

          return true;
        }
      }
    ]
  });

  await alert.present();
}

  
  // Sobre o app
  // Logout
  async logout() {
    const alert = await this.alertController.create({
      header: 'Sair da Conta',
      message: 'Deseja realmente sair da sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: () => {
            // Aqui você implementaria a lógica de logout
            this.mostrarToast('Logout realizado com sucesso!');
            // Redirecionar para tela de login
            localStorage.clear();
            this.navCtrl.navigateRoot('/login');

          }
        }
      ]
    });
    await alert.present();
  }
  async excluirConta() {
    const confirm = await this.alertController.create({
      header: 'Excluir Conta',
      message: 'Tem certeza que deseja excluir sua conta? Essa ação é irreversível.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            const usuarioCpf = this.perfilUsuario.cpf;
            const usuarioId = this.perfilUsuario.id;

            // 1. Verifica se existem dependentes com esse CPF como responsável
            this.usuarioService.buscarDependentes(usuarioCpf)
              .subscribe(dependentes => {
                if (dependentes.length > 0) {
                  this.mostrarToast('Você possui dependentes. Exclua-os primeiro.', 'danger');
                  return;
                }

                // 2. Se não há dependentes, deleta o usuário
                this.historicoService.excluirPorUsuario(usuarioId).subscribe(() => {
                  this.usuarioService.excluir(usuarioId).subscribe(() => {
                    this.mostrarToast('Conta excluída com sucesso!');
                    localStorage.clear();
                    this.navCtrl.navigateRoot('/login');
                  }, error => {
                    this.mostrarToast('Erro ao excluir conta!', 'danger');
                    console.error(error);
                  });
                }, error => {
                  this.mostrarToast('Erro ao excluir histórico!', 'danger');
                  console.error(error);
                });


              }, error => {
                this.mostrarToast('Erro ao verificar dependentes!', 'danger');
                console.error(error);
              });
          }
        }
      ]
    });

    await confirm.present();
  }



  // Helpers
  private async mostrarToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}