import { Component } from '@angular/core';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone:false
})
export class Tab3Page {

  // Dados do perfil do usuário
  perfilUsuario = {
    nome: 'João Silva',
    nomeCompleto: 'João Silva Santos',
    email: 'joao.silva@email.com',
    telefone: '(11) 99999-9999',
    cidade: 'São Paulo, SP',
    dataNascimento: '15/03/1990',
    foto: '' // URL da foto ou deixar vazio para avatar padrão
  };

  // Configurações do app
  configuracoes = {
    notificacoes: true,
    modoEscuro: false,
    idioma: 'pt'
  };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {}

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
          name: 'cidade',
          type: 'text',
          placeholder: 'Cidade',
          value: this.perfilUsuario.cidade
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
            this.perfilUsuario.nome = data.nome;
            this.perfilUsuario.telefone = data.telefone;
            this.perfilUsuario.cidade = data.cidade;
            this.mostrarToast('Informações atualizadas com sucesso!');
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
            if (data.novaSenha !== data.confirmarSenha) {
              this.mostrarToast('As senhas não coincidem!', 'danger');
              return false;
            }
            // Aqui você implementaria a lógica de alterar senha
            this.mostrarToast('Senha alterada com sucesso!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  // Alterar tema (modo escuro)
  alterarTema() {
    document.body.classList.toggle('dark', this.configuracoes.modoEscuro);
    this.mostrarToast(
      this.configuracoes.modoEscuro ? 'Modo escuro ativado' : 'Modo claro ativado'
    );
  }

  // Sincronizar dados
  async sincronizarDados() {
    const loading = await this.mostrarLoading('Sincronizando...');
    
    // Simular sincronização
    setTimeout(async () => {
      await loading.dismiss();
      this.mostrarToast('Dados sincronizados com sucesso!');
    }, 2000);
  }

  // Limpar cache
  async limparCache() {
    const alert = await this.alertController.create({
      header: 'Limpar Cache',
      message: 'Deseja realmente limpar o cache do aplicativo?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Limpar',
          handler: () => {
            this.mostrarToast('Cache limpo com sucesso!');
          }
        }
      ]
    });
    await alert.present();
  }

  // Sobre o app
  async sobre() {
    const alert = await this.alertController.create({
      header: 'Sobre o App',
      message: `
        <strong>Questionário Vacina</strong><br>
        Versão: 1.0.0<br>
        Desenvolvido com Ionic + Angular<br><br>
        © 2024 - Todos os direitos reservados
      `,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Compartilhar app
  async compartilharApp() {
    const alert = await this.alertController.create({
      header: 'Compartilhar App',
      message: 'Funcionalidade de compartilhamento será implementada em breve.',
      buttons: ['OK']
    });
    await alert.present();
  }

  // Suporte
  async suporte() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Suporte',
      buttons: [
        {
          text: 'Enviar Email',
          icon: 'mail',
          handler: () => {
            window.open('mailto:suporte@exemplo.com');
          }
        },
        {
          text: 'WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            window.open('https://wa.me/5511999999999');
          }
        },
        {
          text: 'FAQ',
          icon: 'help-circle',
          handler: () => {
            this.mostrarToast('FAQ será implementado em breve');
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
          }
        }
      ]
    });
    await alert.present();
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

  private async mostrarLoading(message: string) {
    const { LoadingController } = await import('@ionic/angular');
    const loadingController = new LoadingController();
    const loading = await loadingController.create({
      message,
      spinner: 'crescent'
    });
    await loading.present();
    return loading;
  }
}