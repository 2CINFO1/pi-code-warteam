import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  backEndApi = environment.backEndApi
  constructor(
    private httpClient: HttpClient
  ) { }

  readProjects () {
    return this.httpClient.get(this.backEndApi + 'projets/affichertout')
  }

  readProject (projectId) {
    return this.httpClient.get(this.backEndApi + 'projets/one/' + projectId)
  }

  createTask (body) {
    return this.httpClient.post(this.backEndApi + 'taches/add', body)
  } 

  addTaskToConsultant (taskId, body) {
    return this.httpClient.post(this.backEndApi + 'taches/affecter/' + taskId, body)
  }

  changeEtatProject (projectId, etat) {
    return this.httpClient.post(this.backEndApi + 'projets/action/' + projectId, {Etat: etat})
  }

  readStats () {
    return this.httpClient.get(this.backEndApi + 'projets/stats')
  }
  
  deleteTask (taskId, body) {
    return this.httpClient.post(this.backEndApi + 'taches/delete/' + taskId, body)
  }
}
