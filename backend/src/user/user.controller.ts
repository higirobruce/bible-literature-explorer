import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getProfile(@Req() req: any) {
    return this.userService.getProfile(req.userId);
  }

  @Get('me/highlights')
  getHighlights(@Req() req: any) {
    return this.userService.getHighlights(req.userId);
  }

  @Post('me/highlights')
  addHighlight(@Req() req: any, @Body() body: Record<string, string>) {
    return this.userService.addHighlight(req.userId, {
      passageId: body.passageId,
      verseRange: body.verseRange,
      color: body.color,
    });
  }

  @Delete('me/highlights/:id')
  removeHighlight(@Req() req: any, @Param('id') id: string) {
    return this.userService.removeHighlight(req.userId, id);
  }

  @Get('me/bookmarks')
  getBookmarks(@Req() req: any) {
    return this.userService.getBookmarks(req.userId);
  }

  @Post('me/bookmarks')
  addBookmark(@Req() req: any, @Body() body: Record<string, string>) {
    return this.userService.addBookmark(req.userId, body.passageId);
  }

  @Delete('me/bookmarks/:passageId')
  removeBookmark(@Req() req: any, @Param('passageId') passageId: string) {
    return this.userService.removeBookmark(req.userId, passageId);
  }

  @Get('me/notes')
  getNotes(@Req() req: any) {
    return this.userService.getNotes(req.userId);
  }

  @Post('me/notes')
  addNote(@Req() req: any, @Body() body: Record<string, string>) {
    return this.userService.addNote(req.userId, {
      passageId: body.passageId,
      text: body.text,
    });
  }

  @Put('me/notes/:id')
  updateNote(@Req() req: any, @Param('id') id: string, @Body() body: Record<string, string>) {
    return this.userService.updateNote(req.userId, id, body.text);
  }

  @Delete('me/notes/:id')
  deleteNote(@Req() req: any, @Param('id') id: string) {
    return this.userService.deleteNote(req.userId, id);
  }

  @Get('me/preferences')
  getPreferences(@Req() req: any) {
    return this.userService.getPreferences(req.userId);
  }

  @Put('me/preferences')
  updatePreferences(@Req() req: any, @Body() body: Record<string, unknown>) {
    return this.userService.updatePreferences(req.userId, {
      defaultTranslation: body.defaultTranslation as string | undefined,
      fontSize: body.fontSize as number | undefined,
      theme: body.theme as string | undefined,
    });
  }
}
