import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function ExplorePage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-medium text-heading">Explore</h1>
      <Card>
        <CardTitle>Knowledge Graph</CardTitle>
        <CardDescription>
          Interactive entity graph visualization coming in v1.4.
        </CardDescription>
      </Card>
    </div>
  );
}
