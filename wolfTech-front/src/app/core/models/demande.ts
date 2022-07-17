export class Demande {

    public title: string;
    public description: string;
    public file: string;
    public status: string;
    public user: string;
    public created_at: string;

    constructor (data) {
        this.title = data.title;
        this.description = data.description
        this.file = data.file;
        this.status = data.status;
        this.created_at = data.created_at
    }

}
