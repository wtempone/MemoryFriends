import { User } from './user';

export class Player {
    order : number;
    score : number;
    user : User;
}

export class Card {
    ind : number;
    cardOfUser : any;
}

export class Message {
    playerIndex : number;
    text : string;
    time : string;
}

export class GameSession {
    intervalPlay? : number;
    playerTurn ?: number;
    players?: Player[];
    numOfCards? : number;
    cards? : Card[];
    messages? : Message[];
    constructor() {
        this.numOfCards  = 0;
        this.playerTurn = 0;
        this.players = new Array<Player>();
        this.cards = new Array<Card>();
        this.messages = new Array<Message>();
    }
}
