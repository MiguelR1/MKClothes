import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from 'src/app/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  cartAlert = this.authS.cartAlert;

  public loginForm:FormGroup = this.fb.group({
    username: ['johnd', Validators.required],
    password: ['m38rmF$', [Validators.required, Validators.minLength(5)]]
  })

  // Vfield(field:FormControl): boolean | null{

  //   if( this.loginForm.controls['field'].getError('required') && this.loginForm.controls['field'].touched ){return true}

  //   return null
  // }

  ngOnInit(): void {}

  get user():User | undefined{
    return this.authS.CurrentUser;
  }

        token!:string | User;

        public username = '';

  login(){
      if (this.loginForm.invalid) {
        return this.loginForm.markAllAsTouched() }

      let username = this.loginForm.controls['username'].value;
      let password = this.loginForm.controls['password'].value;

    this.authS.login( username, password )
    .subscribe( token => {
      if (!token) {
        return
      }
      else{
        this.token = token;
        localStorage.setItem('token', JSON.stringify(token) );
        localStorage.setItem('username', JSON.stringify(username) )
      }
    })
    this.router.navigateByUrl('/store/home');
    this.openSnackBar('Has iniciado sesión', 'Bienvenido');
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000
    });
  }

  constructor( private fb:FormBuilder,
               private router:Router,
               private snackBar: MatSnackBar,
               private authS:AuthService,
               private http: HttpClient) {}

}
