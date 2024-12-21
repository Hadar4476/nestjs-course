import { Module } from '@nestjs/common';
import { PowerModule } from 'src/power/power.module';

import { CpuService } from './cpu.service';

@Module({
  // imports the entire PowerService to the CpuModule.
  imports: [PowerModule],
  providers: [CpuService],
  exports: [CpuService],
})
export class CpuModule {}
