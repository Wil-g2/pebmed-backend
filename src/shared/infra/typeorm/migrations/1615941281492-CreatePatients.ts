import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePatients1615941281492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'patients',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'birth_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'integer',
            default: 1,
          },
          {
            name: 'height',
            type: 'decimal',
          },
          {
            name: 'weight',
            type: 'decimal',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('patients');
  }
}
