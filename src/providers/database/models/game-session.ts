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
    id :  number;
    user : User;
    text : string;
    time : string;
}

export class GameSession {
    id: number;
    intervalPlay? : number;
    playerTurn ?: number;
    numOfPlayers? : number;
    players?: Player[];
    numOfCards? : number;
    cards? : Card[];
    messages? : Message[];
    constructor() {
        this.numOfPlayers = 0;
        this.numOfCards  = 0;
        this.playerTurn = 0;
        this.players = new Array<Player>();
        this.cards = new Array<Card>();
        this.messages = new Array<Message>();
    }

    addPlayer(player: Player) {
        player.order = this.numOfPlayers;
        player.score = 0;
        this.players.push(player);
        this.numOfPlayers += 1;        
    }

    addCard(card: Card) {
        this.numOfCards += 1;
        this.cards.push(card);
    }
}
