import { Component } from '@angular/core';

@Component({
  inputs:['flipped:flipped','disabled:disabled'],
  selector: 'flash-card',
  templateUrl: 'flash-card.html'
})
export class FlashCardComponent {

  flipped: boolean = false;
  disabled: boolean = false;
  
  constructor() {

  }

  flip(){
    if (!this.disabled) {
      this.flipped = !this.flipped;
    }
  }

}