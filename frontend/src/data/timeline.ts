export interface TimelineEvent {
  year: string;
  label: string;
  description: string;
  type: "composition" | "historical" | "manuscript" | "figure";
}

type BookTimeline = Record<string, TimelineEvent[]>;

const BASE_EVENTS: BookTimeline = {
  gen: [
    { year: "~4000 BCE", label: "Creation narratives", description: "Primeval history (Gen 1-11)", type: "historical" },
    { year: "~2000 BCE", label: "Patriarchal period", description: "Abraham, Isaac, Jacob", type: "historical" },
    { year: "~1446 BCE", label: "Exodus from Egypt", description: "Moses leads Israel out of Egypt", type: "historical" },
    { year: "~587 BCE", label: "Babylonian exile", description: "Fall of Jerusalem; exile begins", type: "historical" },
    { year: "~950 BCE", label: "Jahwist source (J)", description: "Early oral traditions written down", type: "composition" },
    { year: "~750 BCE", label: "Elohist source (E)", description: "Northern traditions compiled", type: "composition" },
    { year: "~700 BCE", label: "Deuteronomist source (D)", description: "Deuteronomic history begins", type: "composition" },
    { year: "~550 BCE", label: "Priestly source (P)", description: "Exilic priestly traditions", type: "composition" },
    { year: "~450 BCE", label: "Final redaction (Torah)", description: "Five books compiled in post-exilic period", type: "composition" },
    { year: "~250 BCE", label: "Septuagint translation", description: "Hebrew Scriptures translated into Greek", type: "manuscript" },
    { year: "~100 CE", label: "Masoretic Text tradition", description: "Standardized Hebrew text begins", type: "manuscript" },
    { year: "~1000 CE", label: "Aleppo Codex", description: "Earliest complete Hebrew Bible manuscript", type: "manuscript" },
  ],
  exod: [
    { year: "~1446 BCE", label: "Exodus from Egypt", description: "Moses leads Israel out of bondage", type: "historical" },
    { year: "~1406 BCE", label: "Wilderness wandering ends", description: "Israel enters Canaan", type: "historical" },
    { year: "~950 BCE", label: "Early oral tradition", description: "Exodus stories transmitted orally", type: "composition" },
    { year: "~750 BCE", label: "First written records", description: "Early Exodus narrative compiled", type: "composition" },
    { year: "~550 BCE", label: "Priestly additions", description: "Tabernacle instructions, legal material", type: "composition" },
    { year: "~450 BCE", label: "Final form", description: "Exodus in current form", type: "composition" },
    { year: "~100 CE", label: "Masoretic Text", description: "Standardized Hebrew text", type: "manuscript" },
  ],
  ps: [
    { year: "~1000 BCE", label: "Davidic psalms", description: "Psalms attributed to David", type: "composition" },
    { year: "~950 BCE", label: "Temple worship", description: "Psalms used in First Temple liturgy", type: "historical" },
    { year: "~750 BCE", label: "Asaph and Korah psalms", description: "Levitical psalm collections", type: "composition" },
    { year: "~587 BCE", label: "Exilic laments", description: "Psalms of destruction and longing", type: "composition" },
    { year: "~516 BCE", label: "Second Temple", description: "Temple rebuilt; psalmody restored", type: "historical" },
    { year: "~400 BCE", label: "Psalter compiled", description: "Five books of Psalms collected", type: "composition" },
    { year: "~150 BCE", label: "Greek translation", description: "Psalms in Septuagint", type: "manuscript" },
    { year: "~1000 CE", label: "Aleppo Codex", description: "Earliest complete Psalter MS", type: "manuscript" },
  ],
  matt: [
    { year: "~4 BCE", label: "Birth of Jesus", description: "Traditionally dated to ~4 BCE", type: "historical" },
    { year: "~30 CE", label: "Crucifixion", description: "Jesus executed under Pontius Pilate", type: "historical" },
    { year: "~50 CE", label: "Oral tradition period", description: "Jesus sayings transmitted orally", type: "composition" },
    { year: "~70 CE", label: "Fall of Jerusalem", description: "Destruction of Second Temple", type: "historical" },
    { year: "~80 CE", label: "Gospel of Matthew", description: "Written, possibly in Antioch", type: "composition" },
    { year: "~125 CE", label: "Papyrus 104 (P.Oxy. 4404)", description: "Earliest Matthew fragment", type: "manuscript" },
    { year: "~250 CE", label: "Papyrus 45 (Chester Beatty)", description: "Early codex of Gospels", type: "manuscript" },
    { year: "~350 CE", label: "Codex Sinaiticus", description: "Earliest complete Gospel manuscript", type: "manuscript" },
  ],
  mark: [
    { year: "~30 CE", label: "Crucifixion", description: "Jesus executed under Pontius Pilate", type: "historical" },
    { year: "~65 CE", label: "Gospel of Mark", description: "Earliest Gospel, written in Rome", type: "composition" },
    { year: "~70 CE", label: "Fall of Jerusalem", description: "Destruction of Second Temple", type: "historical" },
    { year: "~250 CE", label: "Papyrus 45 (Chester Beatty)", description: "Early Gospel codex", type: "manuscript" },
    { year: "~350 CE", label: "Codex Sinaiticus", description: "Earliest complete Gospel MS", type: "manuscript" },
  ],
  luke: [
    { year: "~30 CE", label: "Crucifixion", description: "Jesus executed under Pontius Pilate", type: "historical" },
    { year: "~62 CE", label: "Paul arrives in Rome", description: "End of Acts narrative", type: "historical" },
    { year: "~80 CE", label: "Gospel of Luke", description: "Written with Acts as two-volume work", type: "composition" },
    { year: "~95 CE", label: "Luke-Acts in circulation", description: "Widely distributed in early church", type: "composition" },
    { year: "~200 CE", label: "Papyrus 75 (P.Bodmer XIV-XV)", description: "Earliest Luke manuscript", type: "manuscript" },
    { year: "~350 CE", label: "Codex Sinaiticus", description: "Earliest complete Luke MS", type: "manuscript" },
  ],
  john: [
    { year: "~30 CE", label: "Crucifixion", description: "Jesus executed under Pontius Pilate", type: "historical" },
    { year: "~90 CE", label: "Gospel of John", description: "Final Gospel, likely from Ephesus", type: "composition" },
    { year: "~125 CE", label: "Papyrus 52 (P.Ryl. 457)", description: "Earliest NT manuscript, John 18 fragment", type: "manuscript" },
    { year: "~200 CE", label: "Papyrus 66 (P.Bodmer II)", description: "Early substantial John manuscript", type: "manuscript" },
    { year: "~350 CE", label: "Codex Sinaiticus", description: "Earliest complete John MS", type: "manuscript" },
  ],
  acts: [
    { year: "~33 CE", label: "Pentecost", description: "Birth of the early church (Acts 2)", type: "historical" },
    { year: "~49 CE", label: "Council of Jerusalem", description: "Gentile inclusion decided (Acts 15)", type: "historical" },
    { year: "~62 CE", label: "Paul in Rome", description: "End of Acts narrative", type: "historical" },
    { year: "~80 CE", label: "Luke-Acts written", description: "Two-volume work by Luke", type: "composition" },
    { year: "~350 CE", label: "Codex Sinaiticus", description: "Earliest complete Acts MS", type: "manuscript" },
  ],
  rom: [
    { year: "~57 CE", label: "Paul writes Romans", description: "From Corinth to Roman church", type: "composition" },
    { year: "~60 CE", label: "Paul in Rome", description: "Paul arrives as prisoner", type: "historical" },
    { year: "~64 CE", label: "Neronian persecution", description: "Roman Christians persecuted", type: "historical" },
    { year: "~200 CE", label: "Papyrus 46", description: "Earliest Pauline epistles collection", type: "manuscript" },
    { year: "~350 CE", label: "Codex Vaticanus", description: "Early complete Romans MS", type: "manuscript" },
  ],
};

export function getTimelineForBook(bookId: string): TimelineEvent[] {
  return BASE_EVENTS[bookId] ?? [
    { year: "—", label: "Timeline data pending", description: "Events for this book are not yet curated.", type: "historical" },
  ];
}
