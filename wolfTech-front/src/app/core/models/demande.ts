import { environment } from "src/environments/environment";

export class Demande {

    public id: string;
    public title: string;
    public description: string;
    public file: string;
    public status: string;
    public user: string;
    public created_at: string;

    constructor (data) {
        this.id = data._id
        this.title = data.title;
        this.description = data.description
        this.file = environment.backEndApi + data.file;
        this.status = data.status;
        this.created_at = data.created_at
    }

}
