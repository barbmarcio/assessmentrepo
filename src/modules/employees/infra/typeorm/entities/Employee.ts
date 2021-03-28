import Shop from '@modules/shops/infra/typeorm/entities/Shop';
import EmployeeType from '@modules/employees_types/infra/typeorm/entities/EmployeeType';
import {
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('employees')
class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToOne(() => EmployeeType)
  @JoinColumn({ name: 'type_id' })
  type: EmployeeType;

  @Column()
  telephone: string;

  @Column()
  address: string;

  @Column()
  employment_date: Date;

  @ManyToOne(() => Shop)
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}

export default Employee;
