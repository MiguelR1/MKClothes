import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
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

  get totalProducts(){
    if (this.storeS.totalProducts <= 0) {
      return false
    }
    return this.storeS.totalProducts;
  }

  ngOnInit(): void {
    this.getCategories();
    this.storeS.cantidadProducts();
  }

  getCategories(){
    this.storeS.getCategories()
    .subscribe( category => this.categories = category )
  }

  get user(){
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
