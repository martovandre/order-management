import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { OrderFilterDto } from './dto/order-filter.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(orderData: Partial<Order>) {
    const existingOrder = await this.orderRepository.find({where: {
      orderNumber: orderData.orderNumber
    }})

    if(existingOrder.length) {
      throw new ConflictException(`Order number "${orderData.orderNumber}" already exists.`);
    }
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }

  async findAll(filters?: OrderFilterDto) {
    const where: FindOptionsWhere<Order> = {};

    if (filters?.paymentDescription) {
      where.paymentDescription = ILike(`%${filters.paymentDescription}%`);
    }

    if (filters?.country) {
      where.country = ILike(`%${filters.country}%`);
    }

    return this.orderRepository.find({ where });
  }
}
