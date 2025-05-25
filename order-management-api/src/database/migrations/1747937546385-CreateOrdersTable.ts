import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateOrdersTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'orderNumber', type: 'varchar', isUnique: true },
          { name: 'paymentDescription', type: 'varchar' },
          { name: 'streetAddress', type: 'varchar' },
          { name: 'town', type: 'varchar' },
          { name: 'country', type: 'varchar' },
          { name: 'amount', type: 'decimal', precision: 10, scale: 2 },
          { name: 'currency', type: 'varchar' },
          { name: 'paymentDueDate', type: 'date' },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
