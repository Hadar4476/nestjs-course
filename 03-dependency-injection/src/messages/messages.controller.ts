import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  // // WITHOUT IoC(BAD PRACTICE)
  // messageService: MessagesService;
  // constructor(){
  //   this.messageService = new MessagesService();
  // }

  // WITH IoC(GOOD PRACTICE)
  constructor(public messagesService: MessagesService) {}

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    console.log(body);

    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    console.log(id);

    const message = await this.messagesService.findOne(id);

    if (!message) {
      // this will result in 404 status with a custom message
      throw new NotFoundException('message not found');
    }

    return message;
  }
}
