import { Injectable, NotFoundException } from '@nestjs/common';

export interface EntityConnection {
  id: string;
  name: string;
  type: string;
  relationship: string;
}

export interface EntityOccurrence {
  reference: string;
  text: string;
}

export interface EntityData {
  id: string;
  name: string;
  slug: string;
  type: string;
  summary: string;
  background: string;
  image?: string;
  dateRange?: string;
  occurrences: EntityOccurrence[];
  connections: EntityConnection[];
  timeline: { date: string; label: string }[];
}

const entities: Record<string, EntityData> = {
  'person-abraham': {
    id: 'person-abraham',
    name: 'Abraham',
    slug: 'abraham',
    type: 'Person',
    summary: 'Patriarch of the Israelite nation, called by God from Ur of the Chaldeans to found a covenant people.',
    background: 'Abraham (originally Abram) appears in Genesis 11-25 as the founding patriarch of Israel. His story begins in Ur of the Chaldeans (southern Mesopotamia), from which God called him to journey to Canaan. The Abrahamic covenant — land, descendants, and blessing to all nations — forms the theological backbone of the Hebrew Bible. Archaeological evidence from the Middle Bronze Age (c. 2000-1550 BC) shows nomadic pastoralists moving along the Fertile Crescent corridor, consistent with the patriarch narrative.',
    dateRange: 'c. 2000 BC',
    occurrences: [
      { reference: 'Genesis 12:1', text: 'Now the LORD said to Abram, "Go from your country..."' },
      { reference: 'Genesis 15:6', text: 'And he believed the LORD, and he counted it to him as righteousness.' },
      { reference: 'Genesis 17:5', text: 'No longer shall your name be called Abram, but your name shall be Abraham...' },
      { reference: 'Genesis 22:1-19', text: 'The binding of Isaac' },
    ],
    connections: [
      { id: 'person-sarah', name: 'Sarah', type: 'Person', relationship: 'Spouse' },
      { id: 'person-isaac', name: 'Isaac', type: 'Person', relationship: 'Son' },
      { id: 'person-jacob', name: 'Jacob', type: 'Person', relationship: 'Grandson' },
      { id: 'place-canaan', name: 'Canaan', type: 'Place', relationship: 'Destination' },
      { id: 'place-ur', name: 'Ur', type: 'Place', relationship: 'Origin' },
    ],
    timeline: [
      { date: 'c. 2000 BC', label: 'Call of Abram' },
      { date: 'c. 2000 BC', label: 'Covenant established' },
      { date: 'c. 1990 BC', label: 'Birth of Ishmael' },
      { date: 'c. 1985 BC', label: 'Birth of Isaac' },
      { date: 'c. 1950 BC', label: 'Binding of Isaac' },
    ],
  },
  'place-canaan': {
    id: 'place-canaan',
    name: 'Canaan',
    slug: 'canaan',
    type: 'Place',
    summary: 'The land promised to Abraham and his descendants, located between the Mediterranean Sea and the Jordan River.',
    background: 'Canaan refers to the region roughly corresponding to modern-day Israel, Palestine, Lebanon, and parts of Syria. In the Amarna Letters (14th century BC), Canaan is described as a collection of city-states under Egyptian hegemony. The Hebrew Bible presents Canaan as the land promised to Abraham, later conquered under Joshua. Archaeological evidence shows continuous settlement from the Chalcolithic period through the Bronze and Iron Ages.',
    dateRange: 'Bronze Age - Iron Age',
    occurrences: [
      { reference: 'Genesis 12:5', text: 'Abram took Sarai his wife... and they set out for the land of Canaan.' },
      { reference: 'Genesis 17:8', text: 'And I will give to you and to your offspring... all the land of Canaan.' },
    ],
    connections: [
      { id: 'person-abraham', name: 'Abraham', type: 'Person', relationship: 'Promised to' },
      { id: 'place-egypt', name: 'Egypt', type: 'Place', relationship: 'Neighbor' },
    ],
    timeline: [
      { date: 'c. 2000 BC', label: 'Abraham arrives' },
      { date: 'c. 1400 BC', label: 'Conquest under Joshua' },
      { date: 'c. 1000 BC', label: 'United Monarchy' },
    ],
  },
  'concept-covenant': {
    id: 'concept-covenant',
    name: 'Covenant',
    slug: 'covenant',
    type: 'Concept',
    summary: 'A binding agreement between God and humanity, central to biblical theology.',
    background: 'The Hebrew term berit appears over 280 times in the Old Testament. Ancient Near Eastern covenants followed the suzerain-vassal treaty pattern: preamble, historical prologue, stipulations, witnesses, blessings and curses. The Abrahamic covenant (Genesis 15, 17) is unconditional — God alone passes through the severed animals. The Mosaic covenant (Exodus 19-24) is conditional, requiring Israel\'s obedience. The Davidic covenant (2 Samuel 7) promises an eternal dynasty. Jeremiah 31 prophesies a new covenant written on the heart.',
    occurrences: [
      { reference: 'Genesis 15:18', text: 'On that day the LORD made a covenant with Abram...' },
      { reference: 'Exodus 24:8', text: 'Behold the blood of the covenant...' },
      { reference: 'Jeremiah 31:31', text: 'I will make a new covenant...' },
    ],
    connections: [
      { id: 'person-abraham', name: 'Abraham', type: 'Person', relationship: 'Covenant recipient' },
      { id: 'person-moses', name: 'Moses', type: 'Person', relationship: 'Mosaic covenant mediator' },
    ],
    timeline: [
      { date: 'c. 2000 BC', label: 'Abrahamic covenant' },
      { date: 'c. 1440 BC', label: 'Mosaic covenant' },
      { date: 'c. 1000 BC', label: 'Davidic covenant' },
      { date: 'c. 600 BC', label: 'New covenant prophesied' },
    ],
  },
};

@Injectable()
export class EntitiesService {
  findByTypeAndSlug(type: string, slug: string) {
    const key = `${type}-${slug}`;
    const entity = entities[key];
    if (!entity) {
      throw new NotFoundException(`Entity not found: ${key}`);
    }
    return entity;
  }

  search(query: string) {
    const q = query.toLowerCase();
    const results = Object.values(entities).filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q),
    );
    return results.slice(0, 10).map((e) => ({
      id: e.id,
      name: e.name,
      type: e.type,
      slug: e.slug,
    }));
  }
}
