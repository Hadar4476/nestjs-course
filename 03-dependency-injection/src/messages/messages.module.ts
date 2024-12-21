import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  // DEPENDENCY INJECTION
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
