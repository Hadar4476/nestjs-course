import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  // this will make sure the PowerService class is available to other classes.
  exports: [PowerService],
})
export class PowerModule {}
