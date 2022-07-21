import { User } from "./user";

export class Task {

    public id: string
    public nom: string;
    public description: string;
    public date_debut: string;
    public date_fin: string;
    public etat: string;
    public consultant: User
    public created_at: string

    constructor (data) {
        this.id = data._id
        this.nom = data.Nom;
        this.description = data.Description
        this.date_debut = data.Date_Debut
        this.date_fin = data.Date_Fin
        this.etat = data.Etat
        this.consultant = data.User ? new User(data.User) : null
        this.created_at = data.created_at
    }
}
