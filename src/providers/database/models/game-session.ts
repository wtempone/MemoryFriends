import { User } from './user';

export interface Friend{
    id:string;
    name: string;
    picture:string;
    selected?:boolean;
}

export interface Photo {
    id:string;
    picture:string;
    images:Image[];
    selected?:boolean;
}

export interface Image{
    height: number;
    source: string;
    width: number;    
}

export class Player {
    score : number;
    wins?: number;
    ready? : boolean;
    user : User;
    cards?: Friend[];
    constructor() {
        this.score = 0;
    }
}

export interface Card {
    ind : number;
    card : Photo;
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
    Game,
    EndGame    
}

export interface NumCards{
    numCards:number;
    rows:number;
    cols:number;    
}

export interface Turn{
    id: number;
    hit: boolean;
}

export class GameSession {
    step: Steps;
    intervalPlay? : number;
    turn: Turn;
    playerTurn ?: number;
    players?: Player[];
    numOfCards? : NumCards;
    cards? : Card[];
    messages? : Message[];
    cardsPlaceHolder: Friend[];
    winners?:Player[];
    constructor() {
        this.step = Steps.ConfigNumCards;
        this.playerTurn = 0;
        this.players = new Array<Player>();
        this.cards = new Array<Card>();
        this.messages = new Array<Message>();
    }
}
