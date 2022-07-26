import { environment } from "src/environments/environment";

export class User {
    public id: string;
    public first_name : String;
    public last_name  : String;
    public email : String;
    public password :  String;
    public token: String;
    public blocked: boolean;
    public image: string;
    public created_at: Date;

    constructor (data) {
        this.id = data._id;
        this.first_name = data.first_name;
        this.last_name =data.last_name;
        this.email=data.email;
        this.token=data.token;
        this.blocked=data.blocked;
        this.image= data.image ? environment.backEndApi + data.image : 'https://cdn-icons-png.flaticon.com/512/219/219983.png';
    }
}

