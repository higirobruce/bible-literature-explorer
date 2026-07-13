import { Badge } from "@/components/ui/badge";
import { TopicGrid } from "@/components/home/TopicGrid";
import { ContinueReading } from "@/components/home/ContinueReading";

const topics = [
  { name: "People", href: "/explore" },
  { name: "Places", href: "/explore" },
  { name: "Timeline", href: "#" },
  { name: "Maps", href: "#" },
  { name: "Texts", href: "/passage/genesis/1" },
  { name: "Concepts", href: "/explore" },
  { name: "Manuscripts", href: "#" },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="py-8 text-center sm:py-12">
        <Badge className="mb-3">Biblical Literature Explorer</Badge>
        <h1 className="font-heading text-3xl font-medium text-heading sm:text-4xl">
          What would you like to explore today?
        </h1>
        <p className="mt-2 text-secondary">
          Ask a question, search a passage, or browse a topic.
        </p>
        <div className="mx-auto mt-6 flex max-w-lg">
          <input
            type="text"
            placeholder='e.g. "Who are the Nephilim?" or "Genesis 1"'
            className="flex-1 rounded-l-lg border border-border bg-card px-4 py-3 text-sm outline-none transition-colors duration-150 ease-out focus:border-accent"
          />
          <button className="rounded-r-lg bg-deep-indigo px-6 py-3 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-[#252D4A]">
            Search
          </button>
        </div>
      </section>

      <div className="flex flex-wrap justify-center gap-2">
        {topics.map((topic) => (
          <a
            key={topic.name}
            href={topic.href}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-secondary transition-colors duration-150 ease-out hover:border-accent hover:text-accent"
          >
            {topic.name}
          </a>
        ))}
      </div>

      <TopicGrid />

      <ContinueReading />
    </div>
  );
}
