interface LexiconSectionProps {
  word: string;
}

const mockLexicon = {
  strongs: "H7225",
  stepbible: "7225",
  hebrew: "רֵאשִׁית",
  meaning: "beginning, chief, first, firstfruits",
  occurrences: 51,
};

export function LexiconSection({ word }: LexiconSectionProps) {
  return (
    <section>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Lexicon
      </h3>
      <div className="space-y-2 rounded-lg border border-border bg-card p-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-xs text-muted">Hebrew</span>
            <p className="font-medium text-heading">{mockLexicon.hebrew}</p>
          </div>
          <div>
            <span className="text-xs text-muted">Strong&apos;s</span>
            <p className="font-medium text-heading">{mockLexicon.strongs}</p>
          </div>
          <div>
            <span className="text-xs text-muted">STEPBible</span>
            <p className="font-medium text-heading">{mockLexicon.stepbible}</p>
          </div>
          <div>
            <span className="text-xs text-muted">Occurrences</span>
            <p className="font-medium text-heading">{mockLexicon.occurrences}</p>
          </div>
        </div>
        <div>
          <span className="text-xs text-muted">Meaning</span>
          <p className="text-sm text-primary">{mockLexicon.meaning}</p>
        </div>
      </div>
    </section>
  );
}
