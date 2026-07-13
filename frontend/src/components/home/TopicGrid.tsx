import { Card, CardTitle, CardDescription } from "@/components/ui/card";

const topics = [
  { title: "Continue Reading", description: "Genesis 1:1-8" },
  { title: "Today\u2019s Discovery", description: "Enuma Elish and Genesis" },
  { title: "Explore Topics", description: "Covenant, Divine Council, Wisdom" },
  { title: "Questions", description: "Who are the Nephilim?" },
];

export function TopicGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {topics.map((topic) => (
        <Card key={topic.title} className="cursor-pointer">
          <CardTitle className="text-sm font-medium">{topic.title}</CardTitle>
          <CardDescription className="mt-1 text-xs">
            {topic.description}
          </CardDescription>
        </Card>
      ))}
    </div>
  );
}
