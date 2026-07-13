import { Controller, Get, Param, Query } from '@nestjs/common';
import { LexiconService } from './lexicon.service';

@Controller('api/lexicon')
export class LexiconController {
  constructor(private readonly lexiconService: LexiconService) {}

  @Get(':strongs')
  async findOne(@Param('strongs') strongs: string) {
    try {
      return await this.lexiconService.findByStrongs(strongs);
    } catch {
      return { error: 'Lexicon entry not found' };
    }
  }

  @Get()
  async search(@Query('q') query?: string) {
    if (!query) return [];
    return this.lexiconService.search(query);
  }
}
