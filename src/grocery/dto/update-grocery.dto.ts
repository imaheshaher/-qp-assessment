import { PartialType } from '@nestjs/mapped-types';
import { CreateGroceryItemDto } from './create-grocery.dto';

export class UpdateGroceryDto extends PartialType(CreateGroceryItemDto) {}
