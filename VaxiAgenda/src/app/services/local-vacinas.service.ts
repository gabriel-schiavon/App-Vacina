import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalVacinasService {
  private apiUrl = `${environment.apiUrl}/vacinas-locais`;

  constructor(private http: HttpClient) {}

  vincularVacinas(idLocal: number, idsVacinas: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/vincular`, {
      idLocal,
      idsVacinas
    });
  }

  buscarPorLocal(idLocal: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${idLocal}`);
  }

  buscarLocaisPorVacina(idVacina: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por-vacina/${idVacina}`);
  }

}
