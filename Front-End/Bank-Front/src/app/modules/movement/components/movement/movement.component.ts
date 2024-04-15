import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MovementService } from 'src/app/modules/shared/services/movement.service';
import { NewMovementComponent } from '../new-movement/new-movement.component';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-movement',
  templateUrl: './movement.component.html',
  styleUrls: ['./movement.component.css'],
})
export class MovementComponent implements OnInit {
  private movementService = inject(MovementService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getMovements();
  }

  displayedColumns: string[] = [
    'id',
    'type',
    'date',
    'value',
    'account',
    'actions',
  ];
  dataSource = new MatTableDataSource<MovementElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getMovements(): void {
    this.movementService.getMovements().subscribe(
      (data: any) => {
        console.log('Respuesta movements:', data);
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        console.log('error:', error);
      }
    );
  }

  openMovementDialog() {
    const dialogRef = this.dialog.open(NewMovementComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Movimiento Agregado', 'Exitoso');
        this.getMovements();
      } else if (result == 2) {
        this.openSnackBar('Error al guardar el movimiento', 'Error');
      }
    });
  }

  edit(
    id: number,
    type: string,
    date: Date,
    value: number,
    account: AccountElement
  ) {
    const dialogRef = this.dialog.open(NewMovementComponent, {
      width: '450px',
      data: { id: id, type: type, date: date, value: value, account: account },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Movimiento Actualizado', 'Exitoso');
        this.getMovements();
      } else if (result == 2) {
        this.openSnackBar('Error al actualizar el movimiento', 'Error');
      }
    });
  }

  buscar(id: any) {
    if (id.length === 0) {
      return this.getMovements();
    }

    this.movementService.searchById(id).subscribe((resp: any) => {
      this.processMovementResponse(resp);
    });
  }

  processMovementResponse(resp: any) {
    const dataMovement: MovementElement[] = [];

    if ((resp.metadata[0].code = '00')) {
      let listMovement = resp.movementResponse.movement;

      listMovement.forEach((element: MovementElement) => {
        dataMovement.push(element);
      });

      this.dataSource = new MatTableDataSource<MovementElement>(dataMovement);
      this.dataSource.paginator = this.paginator;
    }
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

export interface MovementElement {
  id: number;
  type: string;
  date: Date;
  value: number;
  account: AccountElement;
}

export interface AccountElement {
  id: number;
  number: string;
  balance: number;
}
