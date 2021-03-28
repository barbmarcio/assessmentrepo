import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('employees')
class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type_id: string;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column()
  employment_date: Date;

  @Column()
  shop_id: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Employee;
