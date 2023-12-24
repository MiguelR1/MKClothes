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

  public cartAlert = false;

  ngOnInit() {
    this.getProductos();
  }

  private authCheck(){
    return this.authS.checkAuth()
  }

  closeAlert() {
    this.cartAlert = false;
  }

  cart(producto:Producto){

    this.authCheck().subscribe(
        isAuth => {
        if (!isAuth) {
          this.cartAlert = true
        }else{

          this.storeS.agregarCarrito(producto)
        }
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
        console.log(producto)
        this.productoId = producto
      })
  }

  comprar(){
    this.authCheck().subscribe(
      isAuth => {
      if (!isAuth) {
        this.cartAlert = true
      }else{

        this.openSnackBar('Su compra se ha realizado con éxito','OK!!!')
      }
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
