import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  private async ensureUser(userId: string): Promise<User> {
    let user = await this.userModel.findById(userId);
    if (!user) {
      user = await this.userModel.create({ _id: userId });
    }
    return user;
  }

  async getProfile(userId: string) {
    const user = await this.ensureUser(userId);
    return {
      id: user._id,
      preferences: user.preferences,
      highlightCount: user.highlights.length,
      bookmarkCount: user.bookmarks.length,
      noteCount: user.notes.length,
    };
  }

  async getHighlights(userId: string) {
    const user = await this.ensureUser(userId);
    return user.highlights;
  }

  async addHighlight(userId: string, data: { passageId: string; verseRange: string; color: string }) {
    const user = await this.ensureUser(userId);
    user.highlights.push({ ...data, createdAt: new Date() });
    await user.save();
    return user.highlights[user.highlights.length - 1];
  }

  async removeHighlight(userId: string, highlightId: string) {
    const user = await this.ensureUser(userId);
    const index = user.highlights.findIndex(
      (h) => h._id.toString() === highlightId,
    );
    if (index === -1) throw new NotFoundException('Highlight not found');
    user.highlights.splice(index, 1);
    await user.save();
    return { success: true };
  }

  async getBookmarks(userId: string) {
    const user = await this.ensureUser(userId);
    return user.bookmarks;
  }

  async addBookmark(userId: string, passageId: string) {
    const user = await this.ensureUser(userId);
    if (!user.bookmarks.includes(passageId)) {
      user.bookmarks.push(passageId);
      await user.save();
    }
    return { bookmark: passageId, bookmarks: user.bookmarks };
  }

  async removeBookmark(userId: string, passageId: string) {
    const user = await this.ensureUser(userId);
    user.bookmarks = user.bookmarks.filter((b) => b !== passageId);
    await user.save();
    return { success: true };
  }

  async getNotes(userId: string) {
    const user = await this.ensureUser(userId);
    return user.notes;
  }

  async addNote(userId: string, data: { passageId: string; text: string }) {
    const user = await this.ensureUser(userId);
    user.notes.push({ ...data, createdAt: new Date(), updatedAt: new Date() });
    await user.save();
    return user.notes[user.notes.length - 1];
  }

  async updateNote(userId: string, noteId: string, text: string) {
    const user = await this.ensureUser(userId);
    const note = user.notes.find((n) => n._id.toString() === noteId);
    if (!note) throw new NotFoundException('Note not found');
    note.text = text;
    note.updatedAt = new Date();
    await user.save();
    return note;
  }

  async deleteNote(userId: string, noteId: string) {
    const user = await this.ensureUser(userId);
    const index = user.notes.findIndex((n) => n._id.toString() === noteId);
    if (index === -1) throw new NotFoundException('Note not found');
    user.notes.splice(index, 1);
    await user.save();
    return { success: true };
  }

  async getPreferences(userId: string) {
    const user = await this.ensureUser(userId);
    return user.preferences;
  }

  async updatePreferences(
    userId: string,
    prefs: { defaultTranslation?: string; fontSize?: number; theme?: string },
  ) {
    const user = await this.ensureUser(userId);
    if (prefs.defaultTranslation !== undefined) {
      user.preferences.defaultTranslation = prefs.defaultTranslation;
    }
    if (prefs.fontSize !== undefined) {
      user.preferences.fontSize = prefs.fontSize;
    }
    if (prefs.theme !== undefined) {
      user.preferences.theme = prefs.theme;
    }
    await user.save();
    return user.preferences;
  }
}
