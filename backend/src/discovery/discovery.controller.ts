import { Controller, Get, Param } from '@nestjs/common';
import { DiscoveryService } from './discovery.service';

@Controller('api/discovery')
export class DiscoveryController {
  constructor(private readonly discoveryService: DiscoveryService) {}

  @Get(':passageId')
  async findByPassage(@Param('passageId') passageId: string) {
    return this.discoveryService.findByPassage(passageId);
  }
}
