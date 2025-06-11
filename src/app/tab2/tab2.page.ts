import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  vacinasTomadas = [
    { nome: 'Febre Amarela', data: new Date(2025, 3, 20) },
    { nome: 'Hepatite B', data: new Date(2025, 2, 15) },
    { nome: 'Gripe (Influenza)', data: new Date(2025, 0, 10) }
  ];

  constructor(private navCtrl: NavController) {}

  irParaCalendario() {
    this.navCtrl.navigateForward('/tabs/tab1'); // Ajuste a rota conforme sua configuração de tabs
  }

}