export class Task {

    public nom: string;
    public description: string;
    public date_debut: string;
    public date_fin: string;
    public etat: string;
    public created_at: string

    constructor (data) {
        this.nom = data.Nom;
        this.description = data.Description
        this.date_debut = data.Date_Debut
        this.date_fin = data.Date_Fin
        this.etat = data.Etat
        this.created_at = data.created_at
    }
}
