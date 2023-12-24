import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './pages/nav/nav.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { HomeComponent } from './pages/home/home.component';
import { VerByIdComponent } from './pages/ver-by-id/ver-by-id.component';
import { ByCategoryComponent } from './pages/by-category/by-category.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartComponent } from './pages/cart/cart.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {path: '',
  component: NavComponent,
  children: [
    { path: 'home', component: HomeComponent },
    { path: 'list', component: ListProductsComponent },
    { path: 'ver/:id', component:VerByIdComponent },
    { path: 'category/:id', component:ByCategoryComponent },
    { path: 'contact', component:ContactComponent },
    { path: 'cart', component:CartComponent, canActivate: [AuthGuard], canMatch: [AuthGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
