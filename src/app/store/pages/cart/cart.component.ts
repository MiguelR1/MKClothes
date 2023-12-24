import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { LocalStorageService } from 'angular-web-storage';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {

  public myObject: any; // Objeto obtenido de la API

  get carrito(): Producto[] {
    return this.storeS.carrito
  }

  public getFirstTwoWords(property: string): string {
    const words = property.split(' ');
    return words.slice(0, 2).join(' ');
  }

  totalPrice:number = 0;

  ngOnInit(): void {
    this.getItemCarrito();
  }

  getItemCarrito(){

    const carrito = localStorage.getItem('carrito');

    if (carrito) {
    this.storeS.carrito = JSON.parse(carrito)
    }

    this.totalC()
  }

  restar(i:number, producto:Producto){

    const carritoLS = localStorage.getItem('carrito');

      if (carritoLS) {
      this.storeS.carrito = JSON.parse(carritoLS)
      }

    const mismoProd = this.storeS.carrito.find(objeto => objeto.id === producto.id)

    if (mismoProd) {
      mismoProd.quantity -=1;
      this.totalPrice = Math.max(this.totalPrice - producto.price, 0);
      this.totalPrice = Number(this.totalPrice.toFixed(2));

      if (mismoProd.quantity <= 0) {
        this.borrarCart(i, producto)
      }

    }

    localStorage.setItem('carrito', JSON.stringify(this.storeS.carrito));
    this.storeS.cantidadProducts()

  }


  sumar(producto:Producto){
    const carritoLS = localStorage.getItem('carrito');

    if (carritoLS) {
    this.storeS.carrito = JSON.parse(carritoLS)
  }

  const mismoProd = this.storeS.carrito.find(objeto => objeto.id === producto.id)

  if (mismoProd) {
    mismoProd.quantity +=1;
    this.totalPrice = Math.max(this.totalPrice + producto.price, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

    localStorage.setItem('carrito', JSON.stringify(this.storeS.carrito));

    this.storeS.cantidadProducts()
  }

  borrarCart(i:number, producto:Producto){

    const carritoLS = localStorage.getItem('carrito');

    if (carritoLS) {
    this.storeS.carrito = JSON.parse(carritoLS)
    }

    this.storeS.borrarCart(i);

    let productoCompleto = producto.price * producto.quantity;

    this.totalPrice = Math.max(this.totalPrice - productoCompleto, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));

    this.storeS.cantidadProducts()

    localStorage.setItem('carrito', JSON.stringify(this.storeS.carrito))

  }

  get totalProducts(){
    return this.storeS.totalProducts;
  }

  totalC(){
    this.totalPrice = 0;

    for (let carrito of this.carrito) {
      this.totalPrice += carrito.price * carrito.quantity;
    }

  }

  comprarTodo(){
    if (this.carrito) {
     return this.snackbar.open('No tiene nada agregado en el carrito','Ok!!!',{
        duration: 1500
      })
    }
    return this.snackbar.open('Su compra se ha realizado con éxito','Ok!!!',{
        duration: 3000
      })
  }


  constructor(private storeS:StoreService,
              private localS:LocalStorageService,
              private snackbar:MatSnackBar ){}
}
