import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {
  private apiUrl = `${environment.apiUrl}/historicoVacinas`;

  constructor(private http: HttpClient) {}

  excluirPorUsuario(idUsuario: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/usuario/${idUsuario}`);
  }

  // (opcional) Você pode adicionar esse se quiser listar pelo idUsuario
  listarPorUsuario(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?idUsuario=${idUsuario}`);
  }
}
