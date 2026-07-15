import { PassagesService } from './passages.service';
export declare class PassagesController {
    private readonly passagesService;
    constructor(passagesService: PassagesService);
    findOne(book: string, chapter: string, translation?: string): Promise<{
        book: string;
        chapter: number;
        verses: {
            num: number;
            text: string;
            translation: string;
            words: {
                position: number;
                hebrew?: string;
                greek?: string;
                strongs?: string;
                stepbible?: string;
                etcbc?: string;
            }[];
        }[];
        metadata: {
            section: string;
            genre: string;
            dateRange: string;
        };
    } | {
        error: string;
    }>;
}
