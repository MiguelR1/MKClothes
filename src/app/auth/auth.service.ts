import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURl = enviroments.baseUrl;

  private user?:User;

  public cartAlert = false;

  get CurrentUser():User | undefined{
    if (!this.user) {
      return undefined
    }
    return structuredClone(this.user);
  }

  public login(username:string, password:string):Observable<User> {
    return this.http.post<User>(this.baseURl+'auth/login', {username, password} )
    .pipe(
      tap(user => this.user = user),
      tap(user => console.log(user)
      ))
  }

  checkAuth():Observable<boolean>{
    if (!localStorage.getItem('token')) {
      return of(false)
    }
    return of(true)
  }

  public logout(){
    this.user = undefined;
    localStorage.clear()
  }

  constructor(private http:HttpClient) { }
}
