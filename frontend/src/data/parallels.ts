export interface ParallelPassage {
  reference: string;
  description: string;
  type: "synoptic" | "intertextual" | "quotation";
}

type PassageKey = string; // e.g. "matt/5" or "gen/1"

const PARALLEL_PASSAGES: Record<PassageKey, ParallelPassage[]> = {
  "matt/1": [
    { reference: "Luke 3:23-38", description: "Genealogy of Jesus (Lukan version)", type: "synoptic" },
  ],
  "matt/3": [
    { reference: "Mark 1:1-11", description: "John the Baptist and baptism of Jesus", type: "synoptic" },
    { reference: "Luke 3:1-22", description: "John the Baptist and baptism of Jesus", type: "synoptic" },
  ],
  "matt/4": [
    { reference: "Mark 1:12-13", description: "Temptation of Jesus", type: "synoptic" },
    { reference: "Luke 4:1-13", description: "Temptation of Jesus", type: "synoptic" },
  ],
  "matt/5": [
    { reference: "Luke 6:20-49", description: "Sermon on the Plain (parallel to Beatitudes)", type: "synoptic" },
    { reference: "Deuteronomy 5:6-21", description: "Ten Commandments (background to antitheses)", type: "intertextual" },
  ],
  "matt/6": [
    { reference: "Luke 11:1-13", description: "Lord's Prayer and teaching on prayer", type: "synoptic" },
  ],
  "matt/13": [
    { reference: "Mark 4:1-34", description: "Parables of the kingdom", type: "synoptic" },
    { reference: "Luke 8:4-18", description: "Parable of the sower", type: "synoptic" },
  ],
  "matt/26": [
    { reference: "Mark 14:1-72", description: "Passion narrative", type: "synoptic" },
    { reference: "Luke 22:1-71", description: "Passion narrative", type: "synoptic" },
    { reference: "Psalm 22", description: "Psalm quoted by Jesus on the cross", type: "quotation" },
  ],
  "matt/27": [
    { reference: "Mark 15:1-47", description: "Crucifixion", type: "synoptic" },
    { reference: "Luke 23:1-56", description: "Crucifixion", type: "synoptic" },
    { reference: "Psalm 22", description: "Psalm of the suffering righteous", type: "quotation" },
    { reference: "Isaiah 53", description: "Suffering servant passage", type: "intertextual" },
  ],
  "matt/28": [
    { reference: "Mark 16:1-8", description: "Empty tomb", type: "synoptic" },
    { reference: "Luke 24:1-53", description: "Resurrection appearances", type: "synoptic" },
  ],
  "mark/1": [
    { reference: "Matthew 3:1-17", description: "John the Baptist and baptism", type: "synoptic" },
    { reference: "Luke 3:1-22", description: "John the Baptist and baptism", type: "synoptic" },
  ],
  "mark/4": [
    { reference: "Matthew 13:1-52", description: "Parables of the kingdom", type: "synoptic" },
    { reference: "Luke 8:4-18", description: "Parable of the sower", type: "synoptic" },
  ],
  "mark/14": [
    { reference: "Matthew 26:1-75", description: "Passion narrative", type: "synoptic" },
    { reference: "Luke 22:1-71", description: "Passion narrative", type: "synoptic" },
  ],
  "mark/15": [
    { reference: "Matthew 27:1-66", description: "Crucifixion", type: "synoptic" },
    { reference: "Luke 23:1-56", description: "Crucifixion", type: "synoptic" },
  ],
  "luke/1": [
    { reference: "Matthew 1:1-25", description: "Birth narratives (Matthean version)", type: "synoptic" },
  ],
  "luke/2": [
    { reference: "Matthew 2:1-23", description: "Birth of Jesus (Matthean version)", type: "synoptic" },
  ],
  "luke/3": [
    { reference: "Matthew 3:1-17", description: "John the Baptist", type: "synoptic" },
    { reference: "Mark 1:1-11", description: "John the Baptist", type: "synoptic" },
  ],
  "luke/6": [
    { reference: "Matthew 5:1-48", description: "Sermon on the Mount (parallel teaching)", type: "synoptic" },
  ],
  "luke/15": [
    { reference: "Matthew 18:12-14", description: "Parable of the lost sheep", type: "synoptic" },
  ],
  "luke/22": [
    { reference: "Matthew 26:1-75", description: "Passion narrative", type: "synoptic" },
    { reference: "Mark 14:1-72", description: "Passion narrative", type: "synoptic" },
  ],
  "luke/24": [
    { reference: "Matthew 28:1-20", description: "Resurrection", type: "synoptic" },
    { reference: "Mark 16:1-8", description: "Empty tomb", type: "synoptic" },
  ],
  "gen/1": [
    { reference: "Psalm 104", description: "Poetic retelling of creation", type: "intertextual" },
    { reference: "John 1:1-5", description: "Christ as the Logos through whom creation happened", type: "intertextual" },
    { reference: "Colossians 1:15-20", description: "Christ as image of God and agent of creation", type: "intertextual" },
  ],
  "gen/2": [
    { reference: "Genesis 1", description: "First creation account (different tradition)", type: "intertextual" },
    { reference: "Matthew 19:4-6", description: "Jesus cites creation of male and female", type: "quotation" },
  ],
  "exod/12": [
    { reference: "Deuteronomy 16:1-8", description: "Passover regulations (Deuteronomic version)", type: "intertextual" },
    { reference: "Matthew 26:17-30", description: "Last Supper as Passover", type: "intertextual" },
  ],
  "exod/20": [
    { reference: "Deuteronomy 5:6-21", description: "Ten Commandments (Deuteronomic version)", type: "intertextual" },
    { reference: "Matthew 5:17-48", description: "Jesus' teaching on the law", type: "intertextual" },
  ],
  "ps/22": [
    { reference: "Matthew 27:46", description: "Jesus quotes Psalm 22 on the cross", type: "quotation" },
    { reference: "Mark 15:34", description: "Jesus quotes Psalm 22 on the cross", type: "quotation" },
  ],
  "ps/23": [
    { reference: "John 10:1-18", description: "Jesus as the Good Shepherd", type: "intertextual" },
    { reference: "Ezekiel 34", description: "Shepherd imagery in the prophets", type: "intertextual" },
  ],
  "isa/6": [
    { reference: "John 12:39-41", description: "John cites Isaiah's temple vision", type: "quotation" },
    { reference: "Matthew 13:14-15", description: "Jesus cites Isaiah on hardening", type: "quotation" },
  ],
  "isa/53": [
    { reference: "Matthew 8:16-17", description: "Matthew cites Isaiah 53:4", type: "quotation" },
    { reference: "Acts 8:30-35", description: "Philip interprets Isaiah 53 for the Ethiopian", type: "quotation" },
    { reference: "1 Peter 2:22-25", description: "Peter applies Isaiah 53 to Christ's suffering", type: "quotation" },
  ],
  "jer/31": [
    { reference: "Hebrews 8:8-12", description: "Hebrews cites the new covenant promise", type: "quotation" },
  ],
  "ezek/37": [
    { reference: "Revelation 20:1-6", description: "Resurrection imagery (valley of dry bones)", type: "intertextual" },
  ],
  "dan/7": [
    { reference: "Matthew 24:30", description: "Son of Man coming on clouds", type: "intertextual" },
    { reference: "Revelation 13:1-10", description: "Beast from the sea imagery", type: "intertextual" },
  ],
  "jonah/1": [
    { reference: "Matthew 12:38-41", description: "Jesus refers to Jonah as a sign", type: "quotation" },
  ],
};

export function getParallelPassages(book: string, chapter: number): ParallelPassage[] {
  const key = `${book}/${chapter}`;
  return PARALLEL_PASSAGES[key] ?? [];
}
