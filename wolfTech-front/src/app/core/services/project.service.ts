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
}
