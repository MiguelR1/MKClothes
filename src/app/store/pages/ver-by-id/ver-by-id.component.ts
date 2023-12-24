import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ver-by-id',
  templateUrl: './ver-by-id.component.html',
  styles: [
  ]
})
export class VerByIdComponent implements OnInit{

  productoE!: Producto;

  ngOnInit() {
    this.ar.params.pipe(
      switchMap( ({id}) => this.storeS.getByid(id) )
    )
    .subscribe( data => {
      this.productoE = data;
      this.revisarCantidad(data.id)
    })

  }

  revisarCantidad(id:number){
    const carrito = localStorage.getItem('carrito')
    const idProducto = id;

    if (carrito) {
      let carritoA = this.storeS.carrito
      carritoA = JSON.parse( carrito )

      let objetoDeseado = carritoA.find( (objeto: { id: number }) => objeto.id === idProducto)

      if (objetoDeseado) {
        this.productoE.quantity = objetoDeseado.quantity
      }
      if(!objetoDeseado){
        this.productoE.quantity = 0
      }
    }
    if (!carrito) {
      this.productoE.quantity = 0
    }

  }

  back(){
    window.history.back();
  }

  comprar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  agregarCart(number:number, producto:Producto){
     this.storeS.agregarCarritoPage(number, producto);
     this.revisarCantidad(producto.id);
     this.storeS.cantidadProducts()

  }


  constructor( private storeS:StoreService,
               private ar:ActivatedRoute,
               private snackBar: MatSnackBar ){}

}
