import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { Producto } from '../interfaces/producto.interface';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  baseUrlProducts:string = enviroments.baseUrl+`products`;
  baseUrlUsers:string = enviroments.baseUrl+`users`;
  baseUrlCarts:string = enviroments.baseUrl+`carts`;


  public getProductos(){
   return this.http.get<Producto[]>(this.baseUrlProducts);
  }

  getByid(id:number){
    return this.http.get<Producto>(this.baseUrlProducts+`/${id}`)
  }

  getUser(){
    return this.http.get<User>(this.baseUrlUsers+`/1`)
  }

  getCategories(){
    return this.http.get<string[]>(this.baseUrlProducts+`/categories`)
  }

  getbyCat( category:string ):Observable<Producto[]>{
    return this.http.get<Producto[]>(this.baseUrlProducts+`/category/${category}`)
  }

  carrito: Producto[] = []

  totalProducts: number = 0;

  agregarCarrito(producto:Producto) {
    let carritoLS = localStorage.getItem('carrito');

    if (carritoLS) {
      this.carrito = JSON.parse(carritoLS);
    }

    let mismoProd = this.carrito.find((objeto) => objeto.id === producto.id);

    if (mismoProd) {
      mismoProd.quantity++;
    } else {
      producto.quantity = 1;
      this.carrito.push(producto);
    }

    localStorage.setItem('carrito', JSON.stringify(this.carrito));

    this.cantidadProducts()
  }

  cantidadProducts(){
    let carrito = localStorage.getItem('carrito');


    if (carrito) {

      let carritoAr = JSON.parse(carrito)

      this.totalProducts = carritoAr.reduce((total:number, item:any) => total + item.quantity, 0)
    }

    else{
      this.totalProducts = 0
    }

  }

  agregarCarritoPage(number:number, producto: Producto) {

    let carrito = localStorage.getItem('carrito')

    if (carrito) {
      let carritoA = JSON.parse(carrito)
      this.carrito = carritoA
    }

    const mismoProductoIndex = this.carrito.findIndex(elemento => elemento.id === producto.id);

    if (number === +1) {
      if (mismoProductoIndex !== -1) {

        this.carrito[mismoProductoIndex].quantity++;

      } else{
        producto.quantity = 1;
        this.carrito.push(producto);
      }
    }

    if (number === -1) {
      if(producto.quantity>1){

        this.carrito[mismoProductoIndex].quantity--;
        }
        else{
          this.carrito.splice(mismoProductoIndex)
        }
      }

    localStorage.setItem('carrito', JSON.stringify(this.carrito))
  }

  borrarCart(i: number) {

    let carrito = localStorage.getItem("carrito")

    if(carrito){

      this.carrito = JSON.parse(carrito)

      this.carrito.splice(i, 1)

      localStorage.setItem('carrito', JSON.stringify(this.carrito))

    }
  }

  constructor( private http: HttpClient ) { }
}
