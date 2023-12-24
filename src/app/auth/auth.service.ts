import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { StoreService } from '../store/store.service';

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
      tap(user => this.user = user)
      )
  }

  checkAuth():Observable<boolean>{
    if (!localStorage.getItem('token')) {
      return of(false)
    }
    return of(true)
  }

  public logout(){
    this.user = undefined;
    localStorage.clear();
    this.storeS.totalProducts = 0;
  }

  constructor(private http:HttpClient,
              private storeS:StoreService) { }
}
