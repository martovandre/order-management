import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
  NonNullableFormBuilder,
} from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateOrderDto } from '../../services/types';

@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class OrderFormComponent {
  orderForm: FormGroup<{
    [K in keyof CreateOrderDto]: FormControl<CreateOrderDto[K]>;
  }>;
  error = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private dialogRef: MatDialogRef<OrderFormComponent>,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
  ) {
    this.orderForm = this.fb.group({
      orderNumber: ['', Validators.required],
      paymentDescription: ['', Validators.required],
      streetAddress: ['', Validators.required],
      town: ['', Validators.required],
      country: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0.01)]],
      currency: ['', Validators.required],
      paymentDueDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.orderService
        .addOrder(this.orderForm.value as CreateOrderDto)
        .subscribe({
          next: () => {
            this.dialogRef.close('created');
          },
          error: (error) => {
            const message = error?.message || 'Failed to create order.';
            this.snackBar.open(`${message}`, 'Close', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          },
        });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
