"use client";

import { useState } from "react";
import { VerseList } from "@/components/passage/VerseList";
import { ChapterNav } from "@/components/passage/ChapterNav";
import { Breadcrumb } from "@/components/passage/Breadcrumb";
import { TranslationSelector } from "@/components/passage/TranslationSelector";
import { LayerPills } from "@/components/passage/LayerPills";
import { InspectorPanel } from "@/components/inspector/InspectorPanel";
import { DiscoveryCardDeck } from "@/components/discovery/DiscoveryCardDeck";

interface PassagePageProps {
  params: {
    book: string;
    chapter: string;
  };
}

const mockVerses = [
  { num: 1, text: "In the beginning, God created the heavens and the earth." },
  { num: 2, text: "The earth was without form and void, and darkness was over the face of the deep. And the Spirit of God was hovering over the face of the waters." },
  { num: 3, text: "And God said, \"Let there be light,\" and there was light." },
  { num: 4, text: "And God saw that the light was good. And God separated the light from the darkness." },
  { num: 5, text: "God called the light Day, and the darkness he called Night. And there was evening and there was morning, the first day." },
  { num: 6, text: "And God said, \"Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.\"" },
  { num: 7, text: "And God made the expanse and separated the waters that were under the expanse from the waters that were above the expanse. And it was so." },
  { num: 8, text: "And God called the expanse Heaven. And there was evening and there was morning, the second day." },
];

export default function PassagePage({ params }: PassagePageProps) {
  const { book, chapter } = params;
  const bookName = book.charAt(0).toUpperCase() + book.slice(1);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Breadcrumb book={bookName} chapter={chapter} />
          <h1 className="font-heading text-2xl font-medium text-heading sm:text-3xl">
            {bookName} {chapter}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <LayerPills />
          <TranslationSelector />
        </div>
      </div>

      <VerseList verses={mockVerses} onWordClick={setSelectedWord} />

      <DiscoveryCardDeck />

      <ChapterNav book={book} chapter={parseInt(chapter)} totalChapters={50} />

      <InspectorPanel word={selectedWord} onClose={() => setSelectedWord(null)} />
    </div>
  );
}
