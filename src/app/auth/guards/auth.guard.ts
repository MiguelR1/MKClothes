import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanMatch, CanActivate {


  constructor( private authS:AuthService,
               private router:Router ) { }

  private authCheck(){
    return this.authS.checkAuth()
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

    return this.authCheck().pipe(tap( isAuth => {
      if(!isAuth) {
        this.authS.cartAlert = true
      }

    } ))

    // console.log('Can match')

    // console.log({route, segments})
    // return false
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>{

    return this.authCheck();


    // console.log('Can activate')

    // console.log({route, state})

    // return true
  }


}
