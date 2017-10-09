import { User } from './user';

export interface Friend{
    id:string;
    name: string;
    picture:string;
    selected?:boolean;
}

export class Player {
    score : number;
    ready? : boolean;
    user : User;
    cards?: Friend[];
    constructor() {
        this.score = 0;
    }
}

export interface Card {
    ind : number;
    card : Friend;
    flipped?: boolean;
    resolved?: boolean;
}

export interface Message {
    id: number;
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
    numOfCards? : NumCards;
    cards? : Card[];
    messages? : Message[];
    constructor() {
        this.step = Steps.ConfigNumCards;
        this.playerTurn = 0;
        this.players = new Array<Player>();
        this.cards = new Array<Card>();
        this.messages = new Array<Message>();
    }
}
