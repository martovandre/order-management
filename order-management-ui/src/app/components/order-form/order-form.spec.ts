import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderFormComponent } from './order-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';

describe('OrderFormComponent', () => {
  let component: OrderFormComponent;
  let fixture: ComponentFixture<OrderFormComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<OrderFormComponent>>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['addOrder']);
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [OrderFormComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form', () => {
    expect(component.orderForm.contains('orderNumber')).toBeTrue();
    expect(component.orderForm.contains('currency')).toBeTrue();
    expect(component.orderForm.valid).toBeFalse();
  });

  it('should call addOrder and close dialog on success', () => {
    const mockOrder = {
      id: 'ORD-1',
      orderNumber: '1234',
      paymentDescription: 'Test',
      streetAddress: 'Street 1',
      town: 'Townsville',
      country: 'Countryland',
      amount: 100,
      currency: 'USD',
      paymentDueDate: new Date('2025-12-31'),
    };

    component.orderForm.setValue({
      orderNumber: '1234',
      paymentDescription: 'Test',
      streetAddress: 'Street 1',
      town: 'Townsville',
      country: 'Countryland',
      amount: 100,
      currency: 'USD',
      paymentDueDate: '2025-12-31',
    });

    mockOrderService.addOrder.and.returnValue(of(mockOrder));

    component.onSubmit();

    expect(mockOrderService.addOrder).toHaveBeenCalled();
    expect(mockDialogRef.close).toHaveBeenCalledWith('created');
  });

  it('should show error snackbar if adding order fails', () => {
    component.orderForm.setValue({
      orderNumber: '1234',
      paymentDescription: 'Test',
      streetAddress: 'Street 1',
      town: 'Townsville',
      country: 'Countryland',
      amount: 100,
      currency: 'USD',
      paymentDueDate: '2025-12-31',
    });

    mockOrderService.addOrder.and.returnValue(
      throwError(() => new Error('Server error')),
    );

    component.onSubmit();

    expect(mockSnackBar.open).toHaveBeenCalledWith(
      'Server error',
      'Close',
      jasmine.any(Object),
    );
  });
});
