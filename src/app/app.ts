import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartComponent } from './components/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CartComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'carrito';
}
