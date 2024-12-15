import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { IItem } from '../interfaces/item.interface';
import { AuthenticatedReqeust } from '../interfaces/authenticatedRequest.interface';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<IItem> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll(): Promise<Array<IItem>> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IItem> {
    return this.itemService.findOne(id);
  }

  @Get(':id/add-to-basket')
  async addToBasket(
    @Param('id') itemId: string, 
    @Req() request: AuthenticatedReqeust
  ): Promise<any> {
    const user = request.user;
    return this.itemService.addToBasket(itemId, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<IItem> {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    return this.itemService.remove(id);
  }
}
