import { environment } from "src/environments/environment";
import { Task } from "./task";

export class Project {

    public id: String;
    public nom : String;
    public description   : String;
    public date_debut : String;
    public date_fin :  String;
    public etat : String;
    public file : String;
    public tasks: Task[]

    constructor (data) {
        this.id = data._id
        this.nom = data.Nom;
        this.description = data.Description
        this.date_debut = data.Date_Debut
        this.date_fin = data.Date_Fin
        this.etat= data.Etat
        this.file= environment.backEndApi + data.file
        this.tasks = data.Taches.map( task => new Task(task))
    }
}
