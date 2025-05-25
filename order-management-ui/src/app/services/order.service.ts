import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}
  private orders = new BehaviorSubject<Order[]>([]);
  orders$ = this.orders.asObservable();

  addOrder(order: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/orders`, order.value).pipe(
      tap((createdOrder: any) => {
        const current = this.orders.getValue();
        this.orders.next([...current, createdOrder]);
      }),
      catchError((error) => {
        const userMessage = error?.error?.message || 'Something went wrong';
        return throwError(() => new Error(userMessage));
      })
    );
  }

  getOrders(filters?: { paymentDescription?: string; country?: string }) {
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
