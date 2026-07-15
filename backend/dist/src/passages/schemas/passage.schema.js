"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassageSchema = exports.Passage = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
class WordData {
    position;
    hebrew;
    greek;
    strongs;
    stepbible;
    etcbc;
}
class Verse {
    num;
    text;
    translation;
    words;
}
class PassageMetadata {
    section;
    genre;
    dateRange;
}
let Passage = class Passage extends mongoose_2.Document {
    book;
    chapter;
    verses;
    metadata;
};
exports.Passage = Passage;
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", String)
], Passage.prototype, "book", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, index: true }),
    __metadata("design:type", Number)
], Passage.prototype, "chapter", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ num: Number, text: String, translation: String, words: [{ position: Number, hebrew: String, greek: String, strongs: String, stepbible: String, etcbc: String }] }] }),
    __metadata("design:type", Array)
], Passage.prototype, "verses", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: { section: String, genre: String, dateRange: String } }),
    __metadata("design:type", PassageMetadata)
], Passage.prototype, "metadata", void 0);
exports.Passage = Passage = __decorate([
    (0, mongoose_1.Schema)({ collection: 'passages', timestamps: true })
], Passage);
exports.PassageSchema = mongoose_1.SchemaFactory.createForClass(Passage);
exports.PassageSchema.index({ book: 1, chapter: 1, 'verses.translation': 1 });
exports.PassageSchema.index({ 'verses.text': 'text' });
//# sourceMappingURL=passage.schema.js.map