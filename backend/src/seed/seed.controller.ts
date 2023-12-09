import { Controller, Delete, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  execute() {
    return this.seedService.execute();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  nuke() {
    return this.seedService.nuke();
  }
}
