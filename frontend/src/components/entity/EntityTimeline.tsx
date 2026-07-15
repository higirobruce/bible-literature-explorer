interface TimelineItem {
  date: string;
  label: string;
}

interface EntityTimelineProps {
  items: TimelineItem[];
}

export function EntityTimeline({ items }: EntityTimelineProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
        Timeline
      </h2>
      <div className="overflow-x-auto">
        <div className="flex gap-0 pb-2">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col items-center min-w-[120px]">
              <div className="flex items-center">
                {i > 0 && <div className="h-px w-4 bg-border" />}
                <div className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-card" />
                {i < items.length - 1 && <div className="h-px w-4 bg-border" />}
              </div>
              <span className="mt-1.5 text-xs font-medium text-accent whitespace-nowrap">
                {item.date}
              </span>
              <span className="mt-0.5 text-xs text-secondary text-center whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
