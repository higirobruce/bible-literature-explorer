import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

const topics = [
  { name: "People", href: "#" },
  { name: "Places", href: "#" },
  { name: "Timeline", href: "#" },
  { name: "Maps", href: "#" },
  { name: "Texts", href: "#" },
  { name: "Concepts", href: "#" },
  { name: "Manuscripts", href: "#" },
];

const quickLinks = [
  { title: "Continue Reading", description: "Genesis 1:1-8" },
  { title: "Today's Discovery", description: "Enuma Elish & Genesis" },
  { title: "Explore Topics", description: "Covenant, Divine Council, Wisdom" },
  { title: "Questions", description: "Who are the Nephilim?" },
  { title: "People", description: "Abraham, Moses, David, Isaiah" },
  { title: "Places", description: "Jerusalem, Babylon, Egypt, Nineveh" },
  { title: "Historical Timeline", description: "1000 BC \u2014 586 BC \u2014 538 BC" },
  { title: "Maps", description: "Fertile Crescent" },
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {quickLinks.map((link) => (
          <Card key={link.title} className="cursor-pointer">
            <CardTitle className="text-sm font-medium">{link.title}</CardTitle>
            <CardDescription className="mt-1 text-xs">
              {link.description}
            </CardDescription>
          </Card>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Recent Activity
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardTitle className="text-sm">Research Workspace</CardTitle>
            <CardDescription className="mt-1 text-xs">
              Notes: Genesis 1-11 &middot; Comparison: 4 Gospels
            </CardDescription>
          </Card>
          <Card>
            <CardTitle className="text-sm">Collections</CardTitle>
            <CardDescription className="mt-1 text-xs">
              Messianic Prophecies &middot; Exodus Motif &middot; Wisdom Psalms
            </CardDescription>
          </Card>
        </div>
      </section>
    </div>
  );
}
