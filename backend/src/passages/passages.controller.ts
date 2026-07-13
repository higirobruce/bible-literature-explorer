import { Controller, Get, Param, Query } from '@nestjs/common';
import { PassagesService } from './passages.service';

@Controller('api/passages')
export class PassagesController {
  constructor(private readonly passagesService: PassagesService) {}

  @Get(':book/:chapter')
  async findOne(
    @Param('book') book: string,
    @Param('chapter') chapter: string,
    @Query('translation') translation?: string,
  ) {
    const chapterNum = parseInt(chapter, 10);
    if (isNaN(chapterNum)) {
      return { error: 'Invalid chapter number' };
    }

    const passage = await this.passagesService.findOne(book, chapterNum, translation);
    if (!passage) {
      return { error: 'Passage not found' };
    }

    return passage;
  }
}
