import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChuckNorrisComponent } from './components/chuck-norris/chuck-norris.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [ChuckNorrisComponent],
  imports: [CommonModule, MaterialModule],
})
export class ChuckNorrisModule {}
