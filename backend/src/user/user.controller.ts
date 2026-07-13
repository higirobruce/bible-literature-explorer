import { Controller, Get, Post, Put, Delete, Param, Body, Req } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getProfile(@Req() req: any) {
    return this.userService.getProfile(req.userId ?? 'guest');
  }

  @Get('me/highlights')
  getHighlights(@Req() req: any) {
    return this.userService.getHighlights(req.userId ?? 'guest');
  }

  @Post('me/highlights')
  addHighlight(@Req() req: any, @Body() body: Record<string, string>) {
    return this.userService.addHighlight(req.userId ?? 'guest', {
      passageId: body.passageId,
      verseRange: body.verseRange,
      color: body.color,
    });
  }

  @Delete('me/highlights/:id')
  removeHighlight(@Req() req: any, @Param('id') id: string) {
    return this.userService.removeHighlight(req.userId ?? 'guest', id);
  }

  @Get('me/bookmarks')
  getBookmarks(@Req() req: any) {
    return this.userService.getBookmarks(req.userId ?? 'guest');
  }

  @Post('me/bookmarks')
  addBookmark(@Req() req: any, @Body() body: Record<string, string>) {
    return this.userService.addBookmark(req.userId ?? 'guest', body.passageId);
  }

  @Delete('me/bookmarks/:passageId')
  removeBookmark(@Req() req: any, @Param('passageId') passageId: string) {
    return this.userService.removeBookmark(req.userId ?? 'guest', passageId);
  }

  @Get('me/notes')
  getNotes(@Req() req: any) {
    return this.userService.getNotes(req.userId ?? 'guest');
  }

  @Post('me/notes')
  addNote(@Req() req: any, @Body() body: Record<string, string>) {
    return this.userService.addNote(req.userId ?? 'guest', {
      passageId: body.passageId,
      text: body.text,
    });
  }

  @Put('me/notes/:id')
  updateNote(@Req() req: any, @Param('id') id: string, @Body() body: Record<string, string>) {
    return this.userService.updateNote(req.userId ?? 'guest', id, body.text);
  }
}
