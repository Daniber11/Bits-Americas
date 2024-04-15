import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ClientModule } from '../client/client.module';
import { MaterialModule } from '../shared/material.module';
import { AccountModule } from '../account/account.module';
import { MovementModule } from '../movement/movement.module';
import { ChuckNorrisModule } from '../chuckNorris/chuck-norris.module';

@NgModule({
  declarations: [DashboardComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    ClientModule,
    AccountModule,
    MovementModule,
    ChuckNorrisModule,
    MaterialModule,
  ],
})
export class DashboardModule {}
