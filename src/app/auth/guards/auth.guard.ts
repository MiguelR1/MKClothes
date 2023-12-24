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
        setTimeout(() =>
        {
          this.authS.cartAlert = false
        },
        3000
        )
      }

      this.authS.cartAlert = true
    } ))

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>{
    return this.authCheck();
  }

}
