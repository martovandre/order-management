import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environments';
import { CreateOrderDto, OrderFilter } from './types';

@Injectable({
  providedIn: 'root',
})
@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}
  private orders = new BehaviorSubject<Order[]>([]);
  orders$ = this.orders.asObservable();

  addOrder(order: CreateOrderDto): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, order).pipe(
      tap((createdOrder: Order) => {
        const current = this.orders.getValue();
        this.orders.next([...current, createdOrder]);
      }),
      catchError((error) => {
        const userMessage = error?.error?.message || 'Something went wrong';
        return throwError(() => new Error(userMessage));
      }),
    );
  }

  getOrders(filters?: OrderFilter) {
    let params = new HttpParams();
    if (filters?.paymentDescription) {
      params = params.set('paymentDescription', filters.paymentDescription);
    }
    if (filters?.country) {
      params = params.set('country', filters.country);
    }

    return this.http.get<Order[]>(`${environment.apiUrl}/orders`, { params });
  }
}
