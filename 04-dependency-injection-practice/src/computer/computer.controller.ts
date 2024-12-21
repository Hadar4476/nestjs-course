import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service';
import { DiskService } from 'src/disk/disk.service';

@Controller('computer')
export class ComputerController {
  constructor(
    public cpuService: CpuService,
    public diskService: DiskService,
  ) {}

  @Get()
  run() {
    const watts = this.cpuService.compute(3, 4);
    const data = this.diskService.getData();

    console.log({ watts });
    console.log({ data });

    return {
      watts,
      data,
    };
  }
}
