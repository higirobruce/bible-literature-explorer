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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const passage_schema_1 = require("./schemas/passage.schema");
let PassagesService = class PassagesService {
    passageModel;
    constructor(passageModel) {
        this.passageModel = passageModel;
    }
    async findOne(book, chapter, translation) {
        const normalizedBook = book.toLowerCase();
        const passage = await this.passageModel.findOne({
            book: normalizedBook,
            chapter,
        });
        if (!passage) {
            return null;
        }
        if (translation) {
            return {
                book: passage.book,
                chapter: passage.chapter,
                verses: passage.verses.filter((v) => v.translation === translation),
                metadata: passage.metadata,
            };
        }
        return passage;
    }
};
exports.PassagesService = PassagesService;
exports.PassagesService = PassagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(passage_schema_1.Passage.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PassagesService);
//# sourceMappingURL=passages.service.js.map