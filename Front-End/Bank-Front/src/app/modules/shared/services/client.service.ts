import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  // Obtener todos los client
  getclient() {
    const endpoint = `${base_url}/clients`;
    return this.http.get(endpoint);
  }

  // Guardar un cliente
  saveCliente(body: any) {
    const endpoint = `${base_url}/clients`;
    return this.http.post(endpoint, body);
  }

  // Actualizar un cliente
  updateCliente(body: any, id: any) {
    const endpoint = `${base_url}/clients/${id}`;
    return this.http.put(endpoint, body);
  }

  // Eliminar un cliente
  deleteCliente(id: any) {
    const endpoint = `${base_url}/clients/${id}`;
    return this.http.delete(endpoint);
  }

  // Buscar un cliente por ID
  getClienteById(id: any) {
    const endpoint = `${base_url}/clients/${id}`;
    return this.http.get(endpoint);
  }
}
