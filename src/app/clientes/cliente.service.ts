import { Injectable } from '@angular/core';

import { CLIENTES } from './cliente.json';
import { Cliente } from './cliente.js';

import {of, Observable} from 'rxjs';

import {HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string='http://localhost:9090/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{
    //return of(CLIENTES);
    return this.http.get<Cliente[]>(this.urlEndPoint);

  }
}
