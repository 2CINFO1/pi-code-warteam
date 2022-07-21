export class User {

    public id: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;

    constructor(data) {
        this.id = data._id;
        this.last_name = data.last_name
        this.first_name = data.first_name
        this.email = data.email
        this.password = data.password
    }
}
