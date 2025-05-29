/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { ILike, Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { OrderFilterDto } from './dto/order-filter.dto';
import { generateOrderId } from '../../helpers/generate-order-id';

describe('OrderService', () => {
  let service: OrderService;
  let repository: jest.Mocked<Repository<Order>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
    repository = module.get(getRepositoryToken(Order));
  });

  describe('create', () => {
    it('should create and return a new order if order number is unique', async () => {
      const orderData = {
        id: generateOrderId(),
        orderNumber: '123',
      } as Partial<Order>;
      const createdOrder = { id: 1, ...orderData } as Order;

      repository.find.mockResolvedValue([]);
      repository.create.mockReturnValue(createdOrder);
      repository.save.mockResolvedValue(createdOrder);

      const result = await service.create(orderData);

      expect(repository.find).toHaveBeenCalledWith({
        where: { orderNumber: '123' },
      });
      expect(repository.create).toHaveBeenCalledWith(orderData);
      expect(repository.save).toHaveBeenCalledWith(createdOrder);
      expect(result).toEqual(createdOrder);
    });

    it('should throw ConflictException if order number already exists', async () => {
      const orderData = { orderNumber: '123' } as Partial<Order>;
      repository.find.mockResolvedValue([{} as Order]);

      await expect(service.create(orderData)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all orders matching filters', async () => {
      const filters: OrderFilterDto = {
        paymentDescription: 'paypal',
        country: 'US',
      };

      const expectedOrders = [
        { id: generateOrderId(), paymentDescription: 'PayPal', country: 'USA' },
      ] as Order[];

      repository.find.mockResolvedValue(expectedOrders);

      const result = await service.findAll(filters);

      expect(repository.find).toHaveBeenCalledWith({
        where: {
          paymentDescription: ILike('%paypal%'), // ILike
          country: ILike('%US%'),
        },
      });

      expect(result).toEqual(expectedOrders);
    });

    it('should return all orders if no filters are provided', async () => {
      const expectedOrders = [{ id: generateOrderId() }] as Order[];
      repository.find.mockResolvedValue(expectedOrders);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalledWith({ where: {} });
      expect(result).toEqual(expectedOrders);
    });
  });
});
