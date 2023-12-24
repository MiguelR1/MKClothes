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
      this.productoE.quantity = 1
    } )
  }


  back(){
    window.history.back();
  }

  comprar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  agregarCart(number:number, producto:Producto){
     this.storeS.agregarCarritoPage(number, producto)
  }


  constructor( private storeS:StoreService,
               private ar:ActivatedRoute,
               private snackBar: MatSnackBar ){}

}
