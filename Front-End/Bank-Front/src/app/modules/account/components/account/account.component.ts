import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NewAccountComponent } from '../new-account/new-account.component';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { AccountService } from 'src/app/modules/shared/services/account.service';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  private accountService = inject(AccountService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getAccounts();
  }

  displayedColumns: string[] = ['id', 'number', 'balance', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getAccounts(): void {
    this.accountService.getAccounts().subscribe(
      (data: any) => {
        console.log('Respuesta accounts:', data);
        this.processAccountsResponse(data);
      },
      (error: any) => {
        console.log('error:', error);
      }
    );
  }

  processAccountsResponse(resp: any) {
    const data: any[] = [];

    if ((resp.metadata[0].code = '00')) {
      let listAccounts = resp.accountResponse.accounts;

      listAccounts.forEach((element: any) => {
        data.push(element);
      });

      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;
    }
  }

  openAccountDialog() {
    const dialogRef = this.dialog.open(NewAccountComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Cuenta Agregada', 'Exitosa');
        this.getAccounts();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al guardar la cuenta', 'Error');
      }
    });
  }

  edit(id: number, number: string, balance: string) {
    const dialogRef = this.dialog.open(NewAccountComponent, {
      width: '450px',
      data: { id: id, number: number, balance: balance },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Cuenta Actualizada', 'Exitosa');
        this.getAccounts();
      } else if (result == 2) {
        this.openSnackBar(
          'Se produjo un error al actualizar la cuenta',
          'Error'
        );
      }
    });
  }

  delete(id: any) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: { id: id, module: 'account' },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar('Cuenta Eliminada', 'Exitosa');
        this.getAccounts();
      } else if (result == 2) {
        this.openSnackBar('Se produjo un error al eliminar la cuenta', 'Error');
      }
    });
  }

  buscar(termino: string) {
    if (termino.length === 0) {
      return this.getAccounts();
    }

    this.accountService.getAccountById(termino).subscribe((resp: any) => {
      this.processAccountsResponse(resp);
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

export interface AccountElement {
  id: number;
  number: string;
  balance: number;
  client: any; // Agregar la propiedad client
}
