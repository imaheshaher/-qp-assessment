import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GroceryItem } from './grocery.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => GroceryItem, { eager: true, })
  @JoinColumn({ name: 'groceryItemId' })
  groceryItemId: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  userId: User;
}
