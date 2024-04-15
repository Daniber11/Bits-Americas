import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ClientService } from 'src/app/modules/shared/services/client.service';
import { AccountService } from 'src/app/modules/shared/services/account.service';
import { MovementService } from 'src/app/modules/shared/services/movement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  chartBarClient: any;
  chartDoughnutClient: any;
  chartBarAccount: any;
  chartDoughnutAccount: any;
  chartBarMovement: any;
  chartDoughnutMovement: any;
  totalPayment: number = 0;

  constructor(
    private clientService: ClientService,
    private accountService: AccountService,
    private movementService: MovementService
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.getAccounts();
    this.getMovements();
  }

  getClients() {
    this.clientService.getclient().subscribe(
      (data: any) => {
        console.log('Respuesta clients:', data);
        this.processClientResponse(data);
      },
      (error: any) => {
        console.log('error:', error);
      }
    );
  }

  processClientResponse(resp: any) {
    const nameClient: String[] = [];
    const totalBalance: number[] = [];

    if (resp.metadata[0].code == '00') {
      let listClient = resp.client.client;

      listClient.forEach((element: any) => {
        nameClient.push(element.name);
        totalBalance.push(element.balance);
      });

      // Gráfico de barras para clientes
      this.chartBarClient = new Chart('canvas-bar-client', {
        type: 'bar',
        data: {
          labels: nameClient,
          datasets: [{ label: 'Clientes', data: totalBalance }],
        },
      });

      // Gráfico de dona para clientes
      this.chartDoughnutClient = new Chart('canvas-doughnut-client', {
        type: 'doughnut',
        data: {
          labels: nameClient,
          datasets: [{ label: 'Clientes', data: totalBalance }],
        },
      });
    }
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe(
      (data: any) => {
        console.log('Respuesta accounts:', data);
        this.processAccountResponse(data);
      },
      (error: any) => {
        console.log('error:', error);
      }
    );
  }

  processAccountResponse(resp: any) {
    const nameAccount: String[] = [];
    const totalAmount: number[] = [];

    if (resp.metadata[0].code == '00') {
      let listAccount = resp.account.account;

      listAccount.forEach((element: any) => {
        nameAccount.push(element.name);
        totalAmount.push(element.amount);
      });

      // Gráfico de barras para cuentas
      this.chartBarAccount = new Chart('canvas-bar-account', {
        type: 'bar',
        data: {
          labels: nameAccount,
          datasets: [{ label: 'Cuentas', data: totalAmount }],
        },
      });

      // Gráfico de dona para cuentas
      this.chartDoughnutAccount = new Chart('canvas-doughnut-account', {
        type: 'doughnut',
        data: {
          labels: nameAccount,
          datasets: [{ label: 'Cuentas', data: totalAmount }],
        },
      });
    }
  }

  getMovements() {
    this.movementService.getMovements().subscribe(
      (data: any) => {
        console.log('Respuesta movements:', data);
        this.processMovementResponse(data);
      },
      (error: any) => {
        console.log('error:', error);
      }
    );
  }

  processMovementResponse(resp: any) {
    const nameMovement: String[] = [];
    const totalValue: number[] = [];

    if (resp.metadata[0].code == '00') {
      let listMovement = resp.movement.movement;

      listMovement.forEach((element: any) => {
        nameMovement.push(element.name);
        totalValue.push(element.value);
        this.totalPayment += element.value;
      });

      // Gráfico de barras para movimientos
      this.chartBarMovement = new Chart('canvas-bar-movement', {
        type: 'bar',
        data: {
          labels: nameMovement,
          datasets: [{ label: 'Movimientos', data: totalValue }],
        },
      });

      // Gráfico de dona para movimientos
      this.chartDoughnutMovement = new Chart('canvas-doughnut-movement', {
        type: 'doughnut',
        data: {
          labels: nameMovement,
          datasets: [{ label: 'Movimientos', data: totalValue }],
        },
      });
    }
  }
}
