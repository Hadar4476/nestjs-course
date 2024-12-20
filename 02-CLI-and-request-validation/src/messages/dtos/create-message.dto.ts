// DATA TRANSFER OBJECT(DTO)
// this is a class which defines how the data should look like.
// it can be used with combination of validatiors like "IsString" decorator.

import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;
}
