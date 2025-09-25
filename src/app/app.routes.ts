import { Routes } from '@angular/router';
import { CartComponent } from './components/cart.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  //{ path: 'login', component: LoginComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: 'login' } // ruta por defecto
];
