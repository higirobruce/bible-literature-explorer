import { Model } from 'mongoose';
import { Passage } from './schemas/passage.schema';
export declare class PassagesService {
    private passageModel;
    constructor(passageModel: Model<Passage>);
    findOne(book: string, chapter: number, translation?: string): Promise<(import("mongoose").Document<unknown, {}, Passage, {}, import("mongoose").DefaultSchemaOptions> & Passage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | {
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
    } | null>;
}
