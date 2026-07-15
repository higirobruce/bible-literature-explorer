import { Injectable } from '@nestjs/common';

export interface DiscoveryCard {
  title: string;
  description: string;
  icon: string;
  variant: 'ancient' | 'literature' | 'people' | 'places' | 'question';
}

const mockCards: Record<string, DiscoveryCard[]> = {
  'genesis-1': [
    {
      title: 'ANE Cosmology',
      description: 'The ancient Near Eastern view of a dome-shaped firmament separating waters above from waters below — shared with Mesopotamian cosmology.',
      icon: 'star',
      variant: 'ancient',
    },
    {
      title: 'Enuma Elish',
      description: 'The Babylonian creation epic (c. 1750 BC) shares structural parallels with Genesis 1: order from chaos, divine speech, celestial bodies.',
      icon: 'book-open',
      variant: 'literature',
    },
    {
      title: 'Connected to: Abraham',
      description: 'The God who creates in Genesis 1 is the same God who calls Abraham in Genesis 12 — establishing a covenantal framework.',
      icon: 'users',
      variant: 'people',
    },
    {
      title: 'Location: Mesopotamia',
      description: 'The setting of Genesis 1-11 reflects Mesopotamian geography — the Tigris-Euphrates river system.',
      icon: 'map-pin',
      variant: 'places',
    },
    {
      title: 'Why "Let us"?',
      description: 'The plural "Let us make man" has been interpreted as divine council, royal plural, or Trinity — a major interpretive question.',
      icon: 'help-circle',
      variant: 'question',
    },
  ],
};

@Injectable()
export class DiscoveryService {
  findByPassage(passageId: string) {
    const cards = mockCards[passageId];
    if (!cards) {
      return { cards: [], passageId };
    }
    return { cards, passageId };
  }
}
