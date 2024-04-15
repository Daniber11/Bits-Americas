import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from 'src/app/modules/shared/services/account.service';
import { ClientService } from 'src/app/modules/shared/services/client.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
})
export class NewAccountComponent implements OnInit {
  estadoFormulario: string = '';
  public accountForm!: FormGroup;
  public clients: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewAccountComponent>,
    private accountService: AccountService,
    private clientService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      number: ['', Validators.required],
      balance: ['', Validators.required],
      client: ['', Validators.required],
    });

    this.estadoFormulario = 'Agregar';

    this.clientService.getclient().subscribe(
      (data: any) => {
        this.clients = data; // Assuming data is an array of clients with properties id and name
      },
      (error: any) => {
        console.log('error:', error);
      }
    );

    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  onSave() {
    let data = {
      number: this.accountForm.get('number')?.value,
      balance: this.accountForm.get('balance')?.value,
      client: this.accountForm.get('client')?.value,
    };

    if (this.data != null) {
      // Actualizar cuenta existente
      this.accountService.updateAccount(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      // Crear nueva cuenta
      this.accountService.saveAccount(data).subscribe(
        (data: any) => {
          console.log(data);
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close(3);
  }

  updateForm(data: any) {
    this.accountForm = this.fb.group({
      number: [data.number, Validators.required],
      balance: [data.balance, Validators.required],
      client: [data.client, Validators.required],
    });
  }
}
