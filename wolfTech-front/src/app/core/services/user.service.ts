import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  backEndApi = environment.backEndApi;
  user = {};
  
  constructor(
    private httpClient: HttpClient
  ) { }

  register (body) {
    return this.httpClient.post(this.backEndApi + 'users/register', body)
  }

  login (body) {
    return this.httpClient.post(this.backEndApi + 'users/login', body)
  }

  isAuthenticated () {
    return !localStorage.getItem('token');
  }

  logout () {
    localStorage.clear();
  }

  displayUserByRole (role) {
    return this.httpClient.post(this.backEndApi + 'users/display', role)
  }
  display(body){
    return this.httpClient.post(this.backEndApi + 'users/display', body)
  }

}
