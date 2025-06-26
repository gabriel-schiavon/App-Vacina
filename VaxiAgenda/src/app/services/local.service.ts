import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocalService {
  private apiUrl = `${environment.apiUrl}/locais`;

  constructor(private http: HttpClient) {}

  cadastrar(local: any): Observable<any> {
    return this.http.post(this.apiUrl, local);
  }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  login(email: string, senha: string): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/login?email=${email}&senha=${senha}`);
}

}
