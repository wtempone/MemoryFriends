import { Component } from '@angular/core';

@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message','player: player','currentPlayerIndex: currentPlayerIndex'],  
  templateUrl: 'chat-bubble.html'
})
export class ChatBubbleComponent {
  constructor() {
  }
}
