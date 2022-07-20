import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  backEndApi = environment.backEndApi

  constructor(
    private httpClient: HttpClient
  ) { }

  createDemande (body) {
    return this.httpClient.post(this.backEndApi + 'demandes/create', body)
  }

  readDemandes (body) {
    return this.httpClient.get(this.backEndApi + 'demandes', body)
  }

  readDemande (demandeId) {
    return this.httpClient.get(this.backEndApi + 'demandes/one/' + demandeId)
  }

  deleteDemande (demandeId) {
    return this.httpClient.post(this.backEndApi + 'demandes/delete/' + demandeId, {})
  }

  updateDemande (demandeId, body) {
    return this.httpClient.post(this.backEndApi + 'demandes/update/' + demandeId, body)
  }

  changeAction (demandeId, body) {
    return this.httpClient.post(this.backEndApi + 'demandes/actions/' + demandeId, body)
  }

  statsDemande () {
    return this.httpClient.get(this.backEndApi + 'demandes/stats');
  }
}
