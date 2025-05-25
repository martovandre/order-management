import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
  } from 'typeorm';
  
  @Entity('orders')
  @Unique(['orderNumber'])
  export class Order {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    orderNumber: string;
  
    @Column()
    paymentDescription: string;
  
    @Column()
    streetAddress: string;
  
    @Column()
    town: string;
  
    @Column()
    country: string;
  
    @Column('decimal', { precision: 10, scale: 2 })
    amount: number;
  
    @Column()
    currency: string;
  
    @Column({ type: 'date' })
    paymentDueDate: Date;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  