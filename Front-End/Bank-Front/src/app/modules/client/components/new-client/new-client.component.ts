import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from 'src/app/modules/shared/services/client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css'],
})
export class NewClientComponent implements OnInit {
  estadoFormulario: string = '';
  public clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewClientComponent>,
    private clienteService: ClientService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });

    this.estadoFormulario = 'Agregar';

    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }
  }

  onSave() {
    let data = {
      nombre: this.clienteForm.get('nombre')?.value,
      direccion: this.clienteForm.get('direccion')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
    };

    if (this.data != null) {
      // Actualizar cliente existente
      this.clienteService.updateCliente(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      // Crear nuevo cliente
      this.clienteService.saveCliente(data).subscribe(
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
    this.clienteForm = this.fb.group({
      nombre: [data.nombre, Validators.required],
      direccion: [data.direccion, Validators.required],
      telefono: [data.telefono, Validators.required],
    });
  }
}
