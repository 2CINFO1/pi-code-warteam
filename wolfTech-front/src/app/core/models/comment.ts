import { Demande } from "./demande";
import { User } from "./user";

export class Comment {

    public id: string;
    public textC : String;
    public user: User
    public demande: Demande
    likes: User[]
    constructor (data) {
        this.id = data._id;
        this.textC = data.textC;
        this.demande = data.demande ? new Demande(data.demande) : null
        this.user = data.user ? new User(data.user) : null
        this.likes = data.likes.length ? data.likes.map(like => new User(like)) : []
    }
}
