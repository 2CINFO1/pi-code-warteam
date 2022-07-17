import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  backEndApi = environment.backEndApi

  constructor(
    private httpClient: HttpClient
  ) { }

  createComment (body: any) {
    return this.httpClient.post(this.backEndApi + 'commentaires/add', body)
  }
  afficherComment (body: any) {
    return this.httpClient.get(this.backEndApi + 'commentaires/afficher', body)
  }
}
