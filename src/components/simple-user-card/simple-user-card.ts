import { Component } from '@angular/core';

@Component({
  inputs: ['user:user'],
  selector: 'simple-user-card',
  templateUrl: 'simple-user-card.html'
})
export class SimpleUserCardComponent {
  constructor() {

  }

}
