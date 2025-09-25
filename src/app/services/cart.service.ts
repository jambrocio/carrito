import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart-item.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = `${environment.apiUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${userId}/carrito`);
  }

  addItem(userId: string, productId: number, quantity: number): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/${userId}/carrito/items`, {
      productId,
      quantity
    });
  }

  updateItem(userId: string, productId: number, quantity: number): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/${userId}/carrito/items/${productId}`, {
      quantity
    });
  }

  removeItem(userId: string, productId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/carrito/items/${productId}`);
  }

  clearCart(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${userId}/carrito`);
  }
}
