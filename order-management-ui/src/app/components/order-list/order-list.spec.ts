import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderListComponent } from './order-list.component';
import { OrderService } from '../../services/order.service';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../../models/order.model';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  const mockOrders: Order[] = [
    {
      id: 'ORD-1',
      orderNumber: '001',
      paymentDescription: 'Credit Card Payment',
      streetAddress: '123 Main St',
      town: 'Springfield',
      country: 'US',
      amount: 150.0,
      currency: 'USD',
      paymentDueDate: new Date('2025-12-31'),
    },
  ];

  beforeEach(async () => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['getOrders']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockOrderService.getOrders.and.returnValue(of(mockOrders));

    await TestBed.configureTestingModule({
      imports: [OrderListComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: MatDialog, useValue: mockDialog },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should load orders on init', () => {
    expect(mockOrderService.getOrders).toHaveBeenCalled();
    expect(component.orders).toEqual(mockOrders);
  });

  it('should filter and reload orders', () => {
    component.countryFilter = 'US';
    component.descriptionFilter = '';
    component.onFiltersChanged();

    expect(mockOrderService.getOrders).toHaveBeenCalledWith({
      paymentDescription: '',
      country: 'US',
    });
  });
});
