import { Component } from '@angular/core';

/**
 * Generated class for the PlayerCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  inputs: ['player:player','selected:selected','progress:progress'],
  selector: 'player-card',
  templateUrl: 'player-card.html'
})
export class PlayerCardComponent {

  progress:number;
  constructor() {

  }

}
