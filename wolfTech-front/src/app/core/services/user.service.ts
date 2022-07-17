import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backEndApi = environment.backEndApi

  constructor(
    private httpClient: HttpClient
  ) { }

  register (body) {
    return this.httpClient.post(this.backEndApi + 'users/register', body)
  }
}
