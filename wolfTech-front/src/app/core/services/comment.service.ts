import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  backEndApi = environment.backEndApi;

  constructor(
    private httpClient: HttpClient
  ) { }

  createComment (body: any) {
    return this.httpClient.post(this.backEndApi + 'commentaires/add', body);
  }

  readAllComments() {
    return this.httpClient.get(this.backEndApi + 'commentaires')
  }

  afficherComments (demandeId) {
    return this.httpClient.get(this.backEndApi + 'commentaires/afficher/' + demandeId)
  }

  createReponseComment (body) {
    return this.httpClient.post(this.backEndApi + 'reponses/add', body)
  }

  readResponsesByComment (commentId) {
    return this.httpClient.get(this.backEndApi + 'reponses/' + commentId)
  }

  deleteComment (commentId) {
    return this.httpClient.get(this.backEndApi + 'commentaires/delete/' + commentId)
  }

  updateComment (commentId, body) {
    return this.httpClient.post(this.backEndApi + 'commentaires/update/' + commentId, body)
  }
}
