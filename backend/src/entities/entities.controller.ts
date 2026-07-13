import { Controller, Get, Param, Query } from '@nestjs/common';
import { EntitiesService } from './entities.service';

@Controller('api/entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get('search')
  search(@Query('q') query: string) {
    return this.entitiesService.search(query ?? '');
  }

  @Get(':type/:slug')
  findByTypeAndSlug(
    @Param('type') type: string,
    @Param('slug') slug: string,
  ) {
    return this.entitiesService.findByTypeAndSlug(type, slug);
  }
}
