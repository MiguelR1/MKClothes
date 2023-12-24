import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { StoreService } from '../../store.service';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [
  ]
})
export class NavComponent implements OnInit{

  currentUser: string | null;


  categories!: string[];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.storeS.getCategories()
    .subscribe( category => this.categories = category )
  }

  get user(){
    // return this.authS.CurrentUser;
    const username = localStorage.getItem('username');

    return username ? username.replace(/"/g, '') : '';
  }


  get cartAlert(){
    return this.authS.cartAlert;
  }

  logout(){
    this.authS.logout();
    this.router.navigateByUrl('store/home')

  }

  closeAlert(){
    this.authS.cartAlert = false;
  }

constructor( private storeS:StoreService,
             private authS:AuthService,
             private router:Router ){
  this.currentUser = localStorage.getItem('username');
}
}
