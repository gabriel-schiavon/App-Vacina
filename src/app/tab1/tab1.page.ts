import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone:false,
})

export class Tab1Page {
  dataSelecionada: string = '';
  datasMarcadas: string[] = [];

  salvarData() {
    if (this.dataSelecionada) {
      this.datasMarcadas.push(this.dataSelecionada);
      this.dataSelecionada = '';
    }
  }
}
