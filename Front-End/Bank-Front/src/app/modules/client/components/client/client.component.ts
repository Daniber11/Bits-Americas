import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { NewClientComponent } from '../new-client/new-client.component';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { ClientService } from 'src/app/modules/shared/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClienteComponent implements OnInit {
  constructor(
    private clientervice: ClientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getclient();
  }

  displayedColumns: string[] = [
    'id',
    'nombre',
    'direccion',
    'telefono',
    'actions',
  ];
  dataSource = new MatTableDataSource<ClienteElement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getclient(): void {
    this.clientervice.getclient().subscribe(
      (data: any) => {
        console.log('Respuesta client:', data);
        this.processclientResponse(data);
      },
      (error: any) => {
        console.log('error:', error);
      }
    );
  }

  processclientResponse(resp: any) {
    const dataCliente: ClienteElement[] = [];

    if ((resp.metadata[0].code = '00')) {
      let listCliente = resp.clienteResponse.cliente;

      listCliente.forEach((element: ClienteElement) => {
        dataCliente.push(element);
      });

      this.dataSource = new MatTableDataSource<ClienteElement>(dataCliente);
      this.dataSource.paginator = this.paginator;
    }
  }

  openClienteDialog() {
    const dialogRef = this.dialog.open(NewClientComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Cliente Agregado', 'Exitoso');
        this.getclient();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al guardar el cliente', 'Error');
      }
    });
  }

  edit(id: number, nombre: string, direccion: string, telefono: string) {
    const dialogRef = this.dialog.open(NewClientComponent, {
      width: '450px',
      data: {
        id: id,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Cliente Actualizado', 'Exitoso');
        this.getclient();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al actualizar el cliente',
          'Error'
        );
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: { id: id, module: 'cliente' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Cliente Eliminado', 'Exitoso');
        this.getclient();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al eliminar el cliente',
          'Error'
        );
      }
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getclient();
    }

    this.clientervice.getClienteById(termino).subscribe((resp: any) => {
      this.processclientResponse(resp);
    });
  }

  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

export interface ClienteElement {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
}
