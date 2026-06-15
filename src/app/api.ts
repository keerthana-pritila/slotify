import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUser } from './register-user';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Api {
  http = inject(HttpClient);
  // url = "http://localhost:3000/users";
  url = environment.apiUrl + '/users';
  constructor() {
    console.log(environment.apiUrl);
  }

  registerUser(data: RegisterUser) {  // registerUser(data)----send data to API
    return this.http.post(this.url, data); //post --send data
  }
  // Observable--returns array []of RegisterUser objects
  getUsers(): Observable<RegisterUser[]> {
    return this.http.get<RegisterUser[]>(this.url); //get--fetch data
  }

  updateUser(id: string, user: any) {
    // return this.http.put( `http://localhost:3000/users/${id}`,user);
    return this.http.put(`${this.url}/${id}`, user); 
    //if you change environments later, everything still works.
  }
}

