import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccountComponent } from '../account/components/account/account.component';
import { MovementComponent } from '../movement/components/movement/movement.component';
import { ChuckNorrisComponent } from '../chuckNorris/components/chuck-norris/chuck-norris.component';
import { ClienteComponent } from '../client/components/client/client.component';

const childRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'client', component: ClienteComponent },
  { path: 'account', component: AccountComponent },
  { path: 'movement', component: MovementComponent },
  { path: 'chuckNorris', component: ChuckNorrisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class RouterChildModule {}
