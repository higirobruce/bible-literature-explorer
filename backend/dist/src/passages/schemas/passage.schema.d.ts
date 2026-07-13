import { Document } from 'mongoose';
declare class WordData {
    position: number;
    hebrew?: string;
    greek?: string;
    strongs?: string;
    stepbible?: string;
    etcbc?: string;
}
declare class Verse {
    num: number;
    text: string;
    translation: string;
    words: WordData[];
}
declare class PassageMetadata {
    section: string;
    genre: string;
    dateRange: string;
}
export declare class Passage extends Document {
    book: string;
    chapter: number;
    verses: Verse[];
    metadata: PassageMetadata;
}
export declare const PassageSchema: import("mongoose").Schema<Passage, import("mongoose").Model<Passage, any, any, any, any, any, Passage>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Passage, Document<unknown, {}, Passage, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Passage & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: import("mongoose").SchemaDefinitionProperty<import("mongoose").Types.ObjectId, Passage, Document<unknown, {}, Passage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Passage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    book?: import("mongoose").SchemaDefinitionProperty<string, Passage, Document<unknown, {}, Passage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Passage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    chapter?: import("mongoose").SchemaDefinitionProperty<number, Passage, Document<unknown, {}, Passage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Passage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    verses?: import("mongoose").SchemaDefinitionProperty<Verse[], Passage, Document<unknown, {}, Passage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Passage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    metadata?: import("mongoose").SchemaDefinitionProperty<PassageMetadata, Passage, Document<unknown, {}, Passage, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Passage & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Passage>;
export {};
