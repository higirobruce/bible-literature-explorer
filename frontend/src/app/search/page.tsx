import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-2xl font-medium text-heading">Search</h1>
      <Card>
        <CardTitle>Search the Library</CardTitle>
        <CardDescription>
          Search across passages, entities, and manuscripts.
        </CardDescription>
      </Card>
    </div>
  );
}
