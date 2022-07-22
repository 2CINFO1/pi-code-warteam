export class User {

    public id: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
    public token: string;
    public blocked: string;
    public image: string;

    constructor (data) {
        this.id = data._id
        this.first_name = data.first_name;
        this.last_name =data.last_name;
        this.email=data.email;
        this.token=data.token;
        this.blocked=data.blocked;
        this.image= data.image ? "http://localhost:3000/uploads/" + data.image.split('\\')[1] : 'https://cdn-icons-png.flaticon.com/512/219/219983.png';
    }
}
