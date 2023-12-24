import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  public registerForm:FormGroup = this.fb.group({
    name : ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    phone: ['', [Validators.required, this.Vphone]]
  })

  // Vfield(field:FormControl): boolean | null{

  //   if( this.loginForm.controls['field'].getError('required') && this.loginForm.controls['field'].touched ){return true}

  //   return null
  // }

  Vphone(p:FormControl): {[s:string]: boolean} | null {

    const value = p.value;

    if( value.toString().length == 10){
      return null;
    }

    return {'Vphone': true};

  }


  register(){
      if (this.registerForm.invalid) {
        this.registerForm.markAllAsTouched();
        return this.openSnackBar('No ha funcionado tu resgistro', 'Inténtalo');
      }

    console.log(this.registerForm);

    this.router.navigateByUrl('/store/home');

    this.openSnackBar('Registrado con éxito', 'Bienvenido');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }

  constructor( private fb:FormBuilder,
               private router:Router,
               private snackBar: MatSnackBar) {}


}
