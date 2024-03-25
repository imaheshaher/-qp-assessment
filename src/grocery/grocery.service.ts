import { Injectable, UseGuards, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BookGroceryItemDto,
  CreateGroceryItemDto,
} from './dto/create-grocery.dto';
import { GroceryItem } from './entities/grocery.entity';
import { OrderItem } from './entities/ordered-item.entity';

@Injectable()
export class GroceryItemService {
  constructor(
    @InjectRepository(GroceryItem)
    private readonly groceryItemRepository: Repository<GroceryItem>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
  ) { }

  async create(
    createGroceryItemDto: CreateGroceryItemDto,
  ): Promise<GroceryItem> {
    const groceryItem = this.groceryItemRepository.create(createGroceryItemDto);
    return this.groceryItemRepository.save(groceryItem);
  }

  async findAll(): Promise<GroceryItem[]> {
    return this.groceryItemRepository.find();
  }

  async findOne(id: number): Promise<GroceryItem> {
    return this.groceryItemRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(
    id: number,
    updateGroceryItemDto: CreateGroceryItemDto,
  ): Promise<GroceryItem> {
    const groceryItem = await this.findOne(id);
    if (!groceryItem) {
      throw new Error('Grocery item not found');
    }
    Object.assign(groceryItem, updateGroceryItemDto);
    return this.groceryItemRepository.save(groceryItem);
  }

  async remove(id: number): Promise<void> {
    await this.groceryItemRepository.delete(id);
  }

  async bookItem(userData: any, bookItems: BookGroceryItemDto[]): Promise<any> {
    try {
      const toUpdateGroceryItem = [];
      const orderItems = bookItems.map((item) => {
        const orderItem = new OrderItem();
        orderItem.groceryItemId = item.itemId;
        orderItem.quantity = item.quantity;
        orderItem.userId = userData.id;
        toUpdateGroceryItem.push({
          id: item.itemId,
          quantity: item.quantity,
        });
        return orderItem;
      });
      for (const item of toUpdateGroceryItem) {
        await this.groceryItemRepository
          .createQueryBuilder()
          .update(GroceryItem)
          .set({ quantity: () => `quantity - ${item.quantity}` })
          .where('id = :id', { id: item.id })
          .execute();
      }
      const data = await this.orderItemRepository.save(orderItems);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
