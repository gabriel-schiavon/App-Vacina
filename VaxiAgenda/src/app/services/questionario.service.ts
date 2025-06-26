import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class QuestionarioService {
  private apiUrl = `${environment.apiUrl}/historicoVacinas`;

  constructor(private http: HttpClient) {}

  salvar(historico: any) {
    return this.http.post(this.apiUrl, historico);
  }

  listarPorUsuario(idUsuario: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}?idUsuario=${idUsuario}`);
}

}
