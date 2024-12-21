import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const data = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(data);
    const message = messages.find((item) => item.id === id);
    return message;
  }

  async findAll() {
    const data = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(data) ?? [];

    return messages;
  }

  async create(content: string) {
    const data = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(data) ?? [];

    const id = Math.floor(Math.random() * 999).toString();
    const message = {
      id,
      content,
    };

    messages.push(message);

    const stringifiedMessages = JSON.stringify(messages);
    const result = await writeFile('messages.json', stringifiedMessages);

    console.log(result);
  }
}
