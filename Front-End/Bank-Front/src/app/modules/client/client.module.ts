import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewClientComponent } from './components/new-client/new-client.component';
import { ClienteComponent } from './components/client/client.component';

@NgModule({
  declarations: [ClienteComponent, NewClientComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
})
export class ClientModule {}
