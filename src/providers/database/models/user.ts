export class User {

    public name: string;
    public facebookId: string;
    public email?: string;
    public friends?: any[];
    public profilePic?: any;
    public ranking?: number;
    public userGroups?: any[];

    constructor() {
    }
}

export class Invite {

    public fromUser: User;
    public toUser: User;
    public gameSessionId?: string;
    public confirm?: boolean;

    constructor() {
    }
}