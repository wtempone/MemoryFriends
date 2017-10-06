export class User {

    public name: string;
    public email?: string;
    public facebookId: string;
    public friends?: any[];
    public profilePic?: number;
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