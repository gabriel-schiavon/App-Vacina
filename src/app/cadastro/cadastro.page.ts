import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone:false,
})
export class CadastroPage{

  constructor(private router:Router) { }

  enviar() {
    this.router.navigate(['/questionario']);

  }

}
