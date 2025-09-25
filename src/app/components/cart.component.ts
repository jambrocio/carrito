import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule]
})
export class CartComponent implements OnInit {
  userId = 'demo'; // 🔑 de ejemplo, podrías obtenerlo del login
  products: Product[] = [];
  cart: Cart | null = null;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.products = res
      },
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  loadCart(): void {
    this.cartService.getCart(this.userId).subscribe({
      next: (res) => (this.cart = res),
      error: (err) => console.error('Error cargando carrito', err)
    });
  }

  addToCart(product: Product): void {
    this.cartService.addItem(this.userId, product.id, 1).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error agregando al carrito', err)
    });
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(this.userId, item.productId).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error eliminando item', err)
    });
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity <= 0) return;
    this.cartService.updateItem(this.userId, item.productId, quantity).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error actualizando cantidad', err)
    });
  }

  clearCart(): void {
    this.cartService.clearCart(this.userId).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error('Error vaciando carrito', err)
    });
  }
}
