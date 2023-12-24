import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { Producto } from 'src/app/interfaces/producto.interface';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {


  get carrito(): Producto[] {
    return this.storeS.carrito
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

  restar(i:number, carrito:Producto){

    carrito.quantity -=1;

    this.totalPrice = Math.max(this.totalPrice - carrito.price, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));

    if (carrito.quantity <= 0) {
      this.storeS.borrarCart(i)
    this.getItemCarrito();

    }

  }

  sumar(carrito:Producto){
    carrito.quantity +=1;
    this.totalPrice += carrito.price;
  }

  borrarCart(i:number, carrito:Producto){

    this.storeS.borrarCart(i);

    let productoCompleto = carrito.price * carrito.quantity;

    this.totalPrice = Math.max(this.totalPrice - productoCompleto, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));

    this.getItemCarrito();

  }

  totalC(){
    this.totalPrice = 0;

    for (let carrito of this.carrito) {
      this.totalPrice += carrito.price * carrito.quantity;
    }

  }


  constructor(private storeS:StoreService,
    private localS:LocalStorageService ){}
}
