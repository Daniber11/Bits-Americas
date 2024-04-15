import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  // Obtener todas las cuentas
  getAccounts() {
    const endpoint = `${base_url}/accounts`;
    return this.http.get(endpoint);
  }

  // Guardar una cuenta
  saveAccount(body: any) {
    const endpoint = `${base_url}/accounts`;
    return this.http.post(endpoint, body);
  }

  // Actualizar una cuenta
  updateAccount(body: any, id: any) {
    const endpoint = `${base_url}/accounts/${id}`;
    return this.http.put(endpoint, body);
  }

  // Eliminar una cuenta
  deleteAccount(id: any) {
    const endpoint = `${base_url}/accounts/${id}`;
    return this.http.delete(endpoint);
  }

  // Buscar una cuenta por id
  getAccountById(id: any) {
    const endpoint = `${base_url}/accounts/${id}`;
    return this.http.get(endpoint);
  }
}
