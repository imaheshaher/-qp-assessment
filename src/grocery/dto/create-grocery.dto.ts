import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateGroceryItemDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNumber()
  @Min(0)
  quantity: number;
}

export class BookGroceryItemDto {
  @IsNumber()
  itemId: number;
  @IsNumber()
  quantity: number;
}
