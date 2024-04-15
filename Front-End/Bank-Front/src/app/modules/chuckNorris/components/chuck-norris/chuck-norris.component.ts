import { Component } from '@angular/core';
import { ChuckNorrisService } from 'src/app/modules/shared/services/chuck-norris.service';

@Component({
  selector: 'app-chuck-norris',
  templateUrl: './chuck-norris.component.html',
  styleUrls: ['./chuck-norris.component.css'],
})
export class ChuckNorrisComponent {
  joke: any;

  constructor(private chuckNorrisService: ChuckNorrisService) {}

  getJoke() {
    this.chuckNorrisService.getJoke().subscribe((response: any) => {
      this.joke = response;
    });
  }
}
