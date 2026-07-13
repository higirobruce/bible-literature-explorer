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
exports.PassagesController = void 0;
const common_1 = require("@nestjs/common");
const passages_service_1 = require("./passages.service");
let PassagesController = class PassagesController {
    passagesService;
    constructor(passagesService) {
        this.passagesService = passagesService;
    }
    async findOne(book, chapter, translation) {
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
};
exports.PassagesController = PassagesController;
__decorate([
    (0, common_1.Get)(':book/:chapter'),
    __param(0, (0, common_1.Param)('book')),
    __param(1, (0, common_1.Param)('chapter')),
    __param(2, (0, common_1.Query)('translation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PassagesController.prototype, "findOne", null);
exports.PassagesController = PassagesController = __decorate([
    (0, common_1.Controller)('api/passages'),
    __metadata("design:paramtypes", [passages_service_1.PassagesService])
], PassagesController);
//# sourceMappingURL=passages.controller.js.map