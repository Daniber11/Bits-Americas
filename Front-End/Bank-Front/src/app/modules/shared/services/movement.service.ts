import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const base_url = 'http://localhost:8080/api/v1';

@Injectable({
  providedIn: 'root',
})
export class MovementService {
  constructor(private http: HttpClient) {}

  // Get All Movements
  getMovements() {
    const endpoint = `${base_url}/movements`;
    return this.http.get(endpoint);
  }

  // Save the movements
  saveMovement(body: any) {
    const endpoint = `${base_url}/movements`;
    return this.http.post(endpoint, body);
  }

  // Update movement
  updateMovement(body: any, id: any) {
    const endpoint = `${base_url}/movements/${id}`;
    return this.http.put(endpoint, body);
  }

  // Search movements by date
  searchByDate(fechaInicio: Date, fechaFin: Date, clientId: number) {
    const endpoint = `${base_url}/movements/search`;
    return this.http.post(endpoint, { fechaInicio, fechaFin, clientId });
  }

  // Search movement by ID
  searchById(id: number) {
    const endpoint = `${base_url}/movements/${id}`;
    return this.http.get(endpoint);
  }
}
