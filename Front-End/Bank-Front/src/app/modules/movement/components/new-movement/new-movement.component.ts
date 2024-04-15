import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovementService } from 'src/app/modules/shared/services/movement.service';

@Component({
  selector: 'app-new-movement',
  templateUrl: './new-movement.component.html',
  styleUrls: ['./new-movement.component.css'],
})
export class NewMovementComponent implements OnInit {
  estadoFormulario: string = '';
  public movementForm!: FormGroup;
  public accounts: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewMovementComponent>,
    private movementService: MovementService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.movementForm = this.fb.group({
      type: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required],
      account: ['', Validators.required],
    });

    this.estadoFormulario = 'Agregar';

    if (this.data != null) {
      this.updateForm(this.data);
      this.estadoFormulario = 'Actualizar';
    }

    if (this.data && this.data.accounts) {
      this.accounts = this.data.accounts;
    }
  }

  onSave() {
    let data = {
      type: this.movementForm.get('type')?.value,
      date: this.movementForm.get('date')?.value,
      value: this.movementForm.get('value')?.value,
      account: this.movementForm.get('account')?.value,
    };

    if (this.data != null) {
      // Actualizar movimiento existente
      this.movementService.updateMovement(data, this.data.id).subscribe(
        (data: any) => {
          this.dialogRef.close(1);
        },
        (error: any) => {
          this.dialogRef.close(2);
        }
      );
    } else {
      // Crear nuevo movimiento
      this.movementService.saveMovement(data).subscribe(
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
    this.movementForm = this.fb.group({
      type: [data.type, Validators.required],
      date: [data.date, Validators.required],
      value: [data.value, Validators.required],
      account: [data.account, Validators.required],
    });
  }
}
