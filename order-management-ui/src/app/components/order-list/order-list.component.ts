import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Order } from '../../models/order.model';
import { OrderFormComponent } from '../order-form/order-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-list',
  standalone: true,
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
})

export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  countryFilter = '';
  descriptionFilter = '';
  displayedColumns = ['orderNumber', 'description', 'country', 'dueDate'];

  constructor(public orderService: OrderService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getOrders({
      paymentDescription: this.descriptionFilter,
      country: this.countryFilter,
    }).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Failed to fetch orders:', err);
      }
    });
  }

  onFiltersChanged() {
    this.loadOrders();
  }

  openForm() {
    const dialogRef = this.dialog.open(OrderFormComponent, {
      width: '500px',
      maxWidth: '95vw',
      disableClose: true,
      autoFocus: false,
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'created') {
        this.loadOrders();
        this.snackBar.open('Order created successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }
}
