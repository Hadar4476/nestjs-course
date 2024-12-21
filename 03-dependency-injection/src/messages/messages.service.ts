import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  // // WITHOUT IoC(BAD PRACTICE)
  // messagesRepo: MessagesRepository;
  // constructor(){
  //   this.messagesRepo = new MessagesRepository();
  // }

  // WITH IoC(GOOD PRACTICE)
  constructor(public messagesRepo: MessagesRepository) {}

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
