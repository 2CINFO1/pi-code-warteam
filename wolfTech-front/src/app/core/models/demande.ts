import { environment } from "src/environments/environment";
import { User } from "./user";

export class Demande {

    public id: string;
    public title: string;
    public description: string;
    public file: string;
    public status: string;
    public client: User;
    public created_at: string;

    constructor (data) {
        this.id = data._id
        this.title = data.title;
        this.description = data.description
        this.file = environment.backEndApi + data.file;
        this.status = data.status;
        this.client = data.user ? new User(data.user) : null 
        this.created_at = data.created_at
    }

}
