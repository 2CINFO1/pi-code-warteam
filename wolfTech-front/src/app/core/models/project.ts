export class Project {

    public nom : String;
    public description   : String;
    public date_debut : String;
    public date_fin :  String;
    public etat : String;
    public file : String;

    constructor (data) {
        this.nom = data.Nom;
        this.description = data.Description
        this.date_debut = data.Date_Debut
        this.date_fin = data.Date_Fin
        this.etat= data.Etat
        this.file= data.file
    }
}
