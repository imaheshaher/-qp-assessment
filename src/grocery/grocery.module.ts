import { Module } from '@nestjs/common';
import { GroceryItemController } from './grocery.controller';
import { GroceryItemService } from './grocery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryItem } from './entities/grocery.entity';
import { OrderItem } from './entities/ordered-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GroceryItem, OrderItem])],
  controllers: [GroceryItemController],
  providers: [GroceryItemService]
})
export class GroceryModule {}
