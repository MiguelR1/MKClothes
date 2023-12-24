import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';
import { StoreService } from '../../store.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/auth/auth.service';
import { map, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styles: [
  ]
})
export class ListProductsComponent implements OnInit{

  productos: Producto[] = []

  productoId!: Producto;

  private user?:User;

  public compraAlert = false;

  get cartAlertLP(){
    return this.authS.cartAlert
  }

  ngOnInit() {
    this.getProductos();
  }

  private authCheck(){
    return this.authS.checkAuth()
  }

  closeAlert() {
    this.authS.cartAlert = false;
    this.compraAlert = false
  }

  cart(producto:Producto){

    this.authCheck()
    .subscribe( isAuth => {
        if (!isAuth) {
          setTimeout(() => {
            this.authS.cartAlert = false
          }, 1000);
        }else{
          this.storeS.agregarCarrito(producto)
        }
        this.authS.cartAlert = true
      })
  }

  getProductos(){
    this.storeS.getProductos()
      .subscribe( producto => {
        this.productos = producto} )
  }

  getByid(id:number){
    this.storeS.getByid(id)
      .subscribe( producto =>  {
        this.productoId = producto
      })
  }

  comprar(){
    return this.authCheck()
    .subscribe(
      isAuth => {
      if (!isAuth) {
        setTimeout(() =>
        {
          this.compraAlert = false
        }, 1000)
      }
      else{
        this.openSnackBar('Su compra se ha realizado con éxito','OK!!!')
      }
      this.compraAlert = true

    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  constructor( private storeS:StoreService,
               private authS:AuthService,
               private snackBar: MatSnackBar,
                ){}

}
