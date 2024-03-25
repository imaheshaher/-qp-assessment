import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { GroceryItemService } from './grocery.service';
import { GroceryItem } from './entities/grocery.entity';
import {
  BookGroceryItemDto,
  CreateGroceryItemDto,
} from './dto/create-grocery.dto';
import { JwtStrategy } from 'src/auth/jwt.stratergy';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/role.decorator';

@Controller('grocery-items')
@UseGuards(RolesGuard)
export class GroceryItemController {
  constructor(private readonly groceryItemService: GroceryItemService) {}

  @Post()
  @Roles('Admin')
  async create(
    @Body() createGroceryItemDto: CreateGroceryItemDto,
  ): Promise<GroceryItem> {
    return this.groceryItemService.create(createGroceryItemDto);
  }

  @Get()
  async findAll(): Promise<GroceryItem[]> {
    return this.groceryItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GroceryItem> {
    return this.groceryItemService.findOne(+id);
  }

  @Put(':id')
  @Roles('Admin')
  async update(
    @Param('id') id: string,
    @Body() updateGroceryItemDto: CreateGroceryItemDto,
  ): Promise<GroceryItem> {
    return this.groceryItemService.update(+id, updateGroceryItemDto);
  }

  @Delete(':id')
  @Roles('Admin')
  async remove(@Param('id') id: string): Promise<void> {
    return this.groceryItemService.remove(+id);
  }
  @Post('book')
  async bookItem(@Req() req: any, @Body() bookItems: BookGroceryItemDto[]) {
    return this.groceryItemService.bookItem(req.user, bookItems);
  }
}
