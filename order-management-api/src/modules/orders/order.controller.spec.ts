/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderFilterDto } from './dto/order-filter.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrderService;

  const mockOrderService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrderService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should call orderService.create with the correct DTO', async () => {
      const dto: CreateOrderDto = {
        orderNumber: 'ORD123',
        paymentDescription: 'Online Payment',
        streetAddress: '123 Main St',
        town: 'Springfield',
        country: 'USA',
        amount: 100.5,
        currency: 'USD',
        paymentDueDate: new Date('2025-06-01T00:00:00Z'),
      };

      const createdOrder = { id: 1, ...dto };
      mockOrderService.create.mockResolvedValue(createdOrder);

      const response = await controller.create(dto);

      expect(service.create).toHaveBeenCalledWith(dto);
      expect(response).toEqual(createdOrder);
    });
  });

  describe('findAll', () => {
    it('should call orderService.findAll with filters', async () => {
      const filters: OrderFilterDto = {
        country: 'USA',
        paymentDescription: 'Online Payment',
      };

      const expectedResult = [{ id: 1, orderNumber: 'ORD123', ...filters }];

      mockOrderService.findAll.mockResolvedValue(expectedResult);

      const response = await controller.findAll(filters);

      expect(service.findAll).toHaveBeenCalledWith(filters);
      expect(response).toEqual(expectedResult);
    });

    it('should call orderService.findAll without filters', async () => {
      const expectedResult = [{ id: 1, orderNumber: 'ORD124' }];

      mockOrderService.findAll.mockResolvedValue(expectedResult);

      const response = await controller.findAll(undefined);

      expect(service.findAll).toHaveBeenCalledWith(undefined);
      expect(response).toEqual(expectedResult);
    });
  });
});
