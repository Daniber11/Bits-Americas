import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  mobileQuery: MediaQueryList;

  menuNav = [
    { name: 'Home', route: 'home', icon: 'home' },
    { name: 'Clientes', route: 'client', icon: 'accessibility' },
    {
      name: 'Cuentas',
      route: 'account',
      icon: 'account_circle',
    },
    {
      name: 'Movimientos',
      route: 'movement',
      icon: 'credit_card',
    },
    {
      name: 'ChuckNorris',
      route: 'chuckNorris',
      icon: 'face',
    },
  ];

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
}
