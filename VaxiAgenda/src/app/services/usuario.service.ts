import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

// alteração - karen

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // private apiUrl = 'http://localhost:3000/usuarios'; // ou 'http://api:3000/usuarios' se estiver no Docker
  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  buscarPorCpf(cpf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?cpf=${cpf}`);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  cadastrar(usuario: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/login?email=${email}&senha=${senha}`);
  }


  listar(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/todos`);
  }

  atualizar(usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${usuario.id}`, usuario);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  buscarDependentes(cpfResponsavel: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?responsavelCpf=${cpfResponsavel}`);
  }
}
