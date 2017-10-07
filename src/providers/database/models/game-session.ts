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

export enum Steps {
    ConfigNumCards,
    SelectCard,
    Game
}

export interface NumCards{
    numCards:number;
    rows:number;
    cols:number;    
}

export class GameSession {
    step: Steps;
    intervalPlay? : number;
    playerTurn ?: number;
    players?: Player[];
    numOfCards? : number;
    cards? : Card[];
    messages? : Message[];
    constructor() {
        this.step = Steps.ConfigNumCards;
        this.numOfCards  = 0;
        this.playerTurn = 0;
        this.players = new Array<Player>();
        this.cards = new Array<Card>();
        this.messages = new Array<Message>();
    }
}
