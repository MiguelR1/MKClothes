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

  agregarCarrito(producto: Producto) {

      const mismoProducto = this.carrito.find(elemento => elemento.id === producto.id)

    if (mismoProducto) {
      mismoProducto.quantity++;
      } else {
        producto.quantity = 1;
        this.carrito.push(producto)
      }

    localStorage.setItem('carrito', JSON.stringify(this.carrito))
  }

  agregarCarritoPage(number:number, producto: Producto) {


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
          this.carrito.splice(mismoProductoIndex, 1)
        }
      }

    localStorage.setItem('carrito', JSON.stringify(this.carrito))
  }

  borrarCart(i: number) {

    let carrito = localStorage.getItem("carrito")

    if(carrito){

      let borradoCarrito = JSON.parse(carrito)

      let arregloActualizado = [...borradoCarrito]

      arregloActualizado.splice(i , 1)

      localStorage.setItem("carrito", JSON.stringify(arregloActualizado))
    }
  }


  constructor( private http: HttpClient,
               private localS:LocalStorageService ) { }
}
