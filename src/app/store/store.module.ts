import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StoreRoutingModule } from './store-routing.module';
import { NavComponent } from './pages/nav/nav.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { HomeComponent } from './pages/home/home.component';
import { VerByIdComponent } from './pages/ver-by-id/ver-by-id.component';
import { ByCategoryComponent } from './pages/by-category/by-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialAModule } from './material-a/material-a.module';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AuthModule } from '../auth/auth.module';
import { CartComponent } from './pages/cart/cart.component';


@NgModule({
  declarations: [
    NavComponent,
    ListProductsComponent,
    HomeComponent,
    VerByIdComponent,
    ByCategoryComponent,
    ContactComponent,
    FooterComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialAModule,
    FormsModule
  ],
  exports: [
    FooterComponent
  ]
})
export class StoreModule { }
