import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VacinaService {
  private apiUrl = `${environment.apiUrl}/vacinas`;

  constructor(private http: HttpClient) {}

  buscarPorNome(nomeVacina: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/buscarPorNome?nomeVacina=${encodeURIComponent(nomeVacina)}`);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  listarTodas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  naoTomadas(idUsuario: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nao-tomadas/${idUsuario}`);
  }

}
