import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../store.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto.interface';

@Component({
  selector: 'app-by-category',
  templateUrl: './by-category.component.html',
  styles: [
  ]
})
export class ByCategoryComponent implements OnInit{

  productos!:Producto[];


  ngOnInit() {
    this.ar.params.pipe(
      switchMap( ({id}) => this.storeS.getbyCat(id) )
    )
    .subscribe( productos => this.productos = productos
     )
  }


  constructor( private storeS:StoreService,
               private ar: ActivatedRoute ){}
}
