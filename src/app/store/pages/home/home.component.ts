import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {


  sugerencias = new FormGroup({
    correo: new FormControl (''),
    opinion: new FormControl('')
  })
  enviar(){
    console.log(this.sugerencias.value);
    this.sugerencias.reset();
  }
  constructor(private snackBar: MatSnackBar) {
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

}
