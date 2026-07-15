import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(
    @Query('q') query: string,
    @Query('type') type?: string,
    @Query('translation') translation?: string,
    @Query('book') book?: string,
  ) {
    if (!query) {
      return { results: [], total: 0 };
    }

    return this.searchService.search(query, { type, translation, book });
  }
}
